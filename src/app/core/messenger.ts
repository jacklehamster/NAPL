import { Message } from "../MessageType";
import {
  DataRingReader,
  DataRingWriter,
  IDataWriter,
} from "../utils/data-ring";
import { hookMsgListener } from "../utils/listener";
import { hookSerializers } from "../utils/serializers";
import _ from "lodash";

export const WRITE = 0;
export const READ = 1;

export function hookMessenger(ctrl: Int32Array, data: IDataWriter) {
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

  return {
    sendMessage,
  };
}

export function setupMessenger(
  worker: Worker,
  onMessage: (msg: Message) => void,
) {
  const BYTES = 1024 * 1024;
  const sabToWorker = new SharedArrayBuffer(BYTES);
  const sabFromWorker = new SharedArrayBuffer(BYTES);

  const { listen } = hookMsgListener();

  worker.postMessage({ sabToWorker, sabFromWorker }); //  not transferable

  const unlisten = listen(
    new Int32Array(sabFromWorker, 0, 8),
    new DataRingReader(new Uint8Array(sabFromWorker, 32)),
    onMessage,
  );

  const { sendMessage } = hookMessenger(
    new Int32Array(sabToWorker, 0, 8),
    new DataRingWriter(new Uint8Array(sabToWorker, 32)),
  );
  return {
    sendMessage,
    close: () => {
      unlisten();
    },
  };
}
