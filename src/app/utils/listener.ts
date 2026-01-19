import { READ, WRITE } from "../core/messenger";
import { Message } from "../MessageType";
import { IDataReader } from "./data-ring";
import { processLoop } from "./loop";
import { hookSerializers } from "./serializers";

export function hookMsgListener() {
  const { deserialize } = hookSerializers();

  function listen(
    ctrl: Int32Array,
    data: IDataReader,
    onMessage: (msg: Message) => void,
  ) {
    const stop = processLoop(ctrl, () => {
      // drain whatever is available
      const msg = drain(ctrl, data);
      if (msg) {
        onMessage(msg);
      }
    });
    return () => {
      stop();
    };
  }

  function drain(ctrl: Int32Array, data: IDataReader) {
    const r = Atomics.load(ctrl, READ);
    const w = Atomics.load(ctrl, WRITE);
    if (r === w) {
      return;
    }

    const msg = deserialize(data);
    if (r !== data.offset) {
      Atomics.store(ctrl, READ, data.offset);
    }
    return msg;
  }

  return { listen };
}
