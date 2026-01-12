import { CommMessage } from "./comm/CommMessage";
import { KeyMessage } from "./input/KeyMessage";
import { MessageType } from "./MessageType";
import { PingMessage } from "./ping/PingMessage";
import { hookSerializers } from "./utils/serializers";

export const WRITE = 0;
export const READ = 1;
export const BELL = 2; // doorbell

export type Message = KeyMessage | PingMessage | CommMessage;

export interface Serializer<M extends Message> {
  serialize(msg: M, data: Uint8Array): number;
  deserialize(data: Uint8Array, type: MessageType): [M, number];
}

export function setupMessenger(worker: Worker) {
  const BYTES = 1024 * 1024;
  const sab = new SharedArrayBuffer(BYTES);
  const ctrl = new Int32Array(sab, 0, 8); // make ctrl view locally
  const data = new Uint8Array(sab, 32);

  worker.postMessage({ sab }); //  not transferable

  const { serialize } = hookSerializers();

  function sendMessage<M extends Message>(msg: M) {
    const w0 = Atomics.load(ctrl, WRITE);
    const r0 = Atomics.load(ctrl, READ);
    const wasEmpty = w0 === r0;

    const bytesWritten = serialize(msg, data.subarray(w0));
    if (bytesWritten) {
      Atomics.store(ctrl, WRITE, w0 + bytesWritten);

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
