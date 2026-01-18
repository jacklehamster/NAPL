import { Message, MessageType } from "../MessageType";
import { DataRingWriter } from "../utils/data-ring";
import { hookSerializers } from "../utils/serializers";

export const WRITE = 0;
export const READ = 1;
export const BELL = 2; // doorbell

export function setupMessenger(worker: Worker) {
  const BYTES = 1024 * 1024;
  const sab = new SharedArrayBuffer(BYTES);
  const ctrl = new Int32Array(sab, 0, 8); // make ctrl view locally
  const data = new DataRingWriter(new Uint8Array(sab, 32));

  worker.postMessage({ sab }); //  not transferable

  const { serialize } = hookSerializers();

  function sendMessage<M extends Message>(
    type: M["type"],
    msg: Omit<M, "type">
  ) {
    const w0 = Atomics.load(ctrl, WRITE);
    const r0 = Atomics.load(ctrl, READ);
    const wasEmpty = w0 === r0;

    serialize(type, msg, data);
    if (w0 !== data.offset) {
      Atomics.store(ctrl, WRITE, data.offset);

      if (wasEmpty) {
        Atomics.add(ctrl, BELL, 1);
        Atomics.notify(ctrl, BELL);
      }
    }
  }

  return {
    sendMessage,
  };
}
