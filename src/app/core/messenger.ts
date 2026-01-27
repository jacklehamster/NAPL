import { Message } from "../MessageType";
import { DataRingWriter } from "../utils/data-ring";
import { hookMsgListener } from "../utils/listener";
import { hookSerializers } from "../utils/serializers";
import _ from "lodash";

export const WRITE = 0;
export const READ = 1;

export function hookMessenger(sab: SharedArrayBuffer) {
  const ctrl = new Int32Array(sab, 0, 8);
  const data = new DataRingWriter(new Uint8Array(sab, 32));
  const { serialize } = hookSerializers();

  const notify = _.throttle(() => Atomics.notify(ctrl, WRITE), 0, {
    leading: false,
    trailing: true,
  });

  function sendMessage<M extends Message>(
    type: M["type"],
    msg: Omit<M, "type">,
  ) {
    const w0 = Atomics.load(ctrl, WRITE);
    serialize(type, msg, data);
    if (w0 !== data.offset) {
      Atomics.store(ctrl, WRITE, data.offset);
      notify();
    }
  }

  return { sendMessage };
}

export function hookWorkerMessageListener(worker: Worker) {
  const BYTES = 1024 * 1024;
  const sabToWorker = new SharedArrayBuffer(BYTES);
  const sabFromWorker = new SharedArrayBuffer(BYTES);

  const { listen } = hookMsgListener();
  const messageListeners: Array<(msg: Message) => void> = [];

  worker.postMessage({
    sab: { toWorker: sabToWorker, fromWorker: sabFromWorker },
  }); //  not transferable

  const unlisten = listen(sabFromWorker, (msg) => {
    messageListeners.forEach((listener) => listener(msg));
  });
  const { sendMessage } = hookMessenger(sabToWorker);
  return {
    sendMessage,
    addMessageListener(listener: (msg: Message) => void) {
      messageListeners.push(listener);
      return () => {
        messageListeners.splice(messageListeners.indexOf(listener), 1);
      };
    },
    close: () => {
      unlisten();
    },
  };
}
