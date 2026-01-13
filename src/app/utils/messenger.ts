import { UserMessage } from "../MessageType";
import { KeyMessage } from "../MessageType";
import { MessageType } from "../MessageType";
import { PingMessage } from "../MessageType";
import { DataRingWriter, IDataWriter } from "./data-ring";
import { hookSerializers } from "./serializers";

export const WRITE = 0;
export const READ = 1;
export const BELL = 2; // doorbell

export type Message = KeyMessage | PingMessage | UserMessage;

export interface Serializer<M extends Message> {
  serialize(msg: M, data: IDataWriter): void;
  deserialize(data: Uint8Array, w: number, type: MessageType): [M, number];
}

export function setupMessenger(worker: Worker) {
  const BYTES = 1024 * 1024;
  const sab = new SharedArrayBuffer(BYTES);
  const ctrl = new Int32Array(sab, 0, 8); // make ctrl view locally
  const data = new DataRingWriter(new Uint8Array(sab, 32));

  worker.postMessage({ sab }); //  not transferable

  const { serialize } = hookSerializers();

  function sendMessage<M extends Message>(msg: M) {
    const w0 = Atomics.load(ctrl, WRITE);
    const r0 = Atomics.load(ctrl, READ);
    const wasEmpty = w0 === r0;

    serialize(msg, data);
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
