import { READ, WRITE } from "../core/messenger";
import { Message } from "../MessageType";
import { DataRingReader, IDataReader } from "./data-ring";
import { processLoop } from "./loop";
import { hookSerializers } from "./serializers";

export function hookMsgListener() {
  const { deserialize } = hookSerializers();

  function listen(sab: SharedArrayBuffer, onMessage: (msg: Message) => void) {
    const ctrl = new Int32Array(sab, 0, 8);
    const data = new DataRingReader(new Uint8Array(sab, 32));

    const stop = processLoop(ctrl, () => {
      // drain whatever is available
      const msgs = drain(ctrl, data);
      msgs.forEach((msg) => {
        if (msg) {
          onMessage(msg);
        }
      });
    });
    return () => {
      stop();
    };
  }

  const _msgs: (Message | undefined)[] = [];
  function drain(ctrl: Int32Array, data: IDataReader) {
    const r = Atomics.load(ctrl, READ);
    const w = Atomics.load(ctrl, WRITE);
    if (r === w) {
      return _msgs;
    }

    _msgs.length = 0;
    while (data.offset !== w) {
      _msgs.push(deserialize(data));
    }
    Atomics.store(ctrl, READ, data.offset);
    return _msgs;
  }

  return { listen };
}
