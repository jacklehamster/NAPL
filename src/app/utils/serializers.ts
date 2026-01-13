import { UserMessage } from "../MessageType";
import { KeyMessage } from "../MessageType";
import { MessageType } from "../MessageType";
import { Message, Serializer } from "./messenger";
import { PingMessage } from "../MessageType";
import { hookStringEncoder } from "./StringEncoder";
import { IDataWriter } from "./data-ring";

export function hookSerializers() {
  const { decodeToString } = hookStringEncoder();

  const keySerializer: Serializer<KeyMessage> = {
    serialize: (msg: KeyMessage, data: IDataWriter) => {
      data.writeString(msg.key);
      const bits =
        (msg.altKey ? 1 << 0 : 0) |
        (msg.ctrlKey ? 1 << 1 : 0) |
        (msg.metaKey ? 1 << 2 : 0) |
        (msg.shiftKey ? 1 << 3 : 0) |
        (msg.repeat ? 1 << 4 : 0);
      data.writeByte(bits);
    },
    deserialize: (
      data: Uint8Array,
      w: number,
      type: MessageType.KEY_UP | MessageType.KEY_DOWN
    ) => {
      let offset = w;
      const [key, newOffset] = decodeToString(data, offset);
      offset = newOffset;
      const bits = data[offset++];
      const altKey = (bits & (1 << 0)) !== 0;
      const ctrlKey = (bits & (1 << 1)) !== 0;
      const metaKey = (bits & (1 << 2)) !== 0;
      const shiftKey = (bits & (1 << 3)) !== 0;
      const repeat = (bits & (1 << 4)) !== 0;
      return [
        {
          type,
          key,
          altKey,
          ctrlKey,
          metaKey,
          shiftKey,
          repeat,
        },
        offset,
      ];
    },
  };

  const serializers: [MessageType, Serializer<Message>][] = [
    [MessageType.KEY_DOWN, keySerializer],
    [MessageType.KEY_UP, keySerializer],
    [
      MessageType.PING,
      {
        serialize(msg: PingMessage, data: IDataWriter) {
          data.writeFloat64(msg.now);
        },
        deserialize(data: Uint8Array, w: number) {
          const dv = new DataView(
            data.buffer,
            data.byteOffset,
            data.byteLength
          );
          let offset = w;
          const now = dv.getFloat64(offset, true);
          offset += 8;
          return [{ type: MessageType.PING, now }, offset];
        },
      },
    ],
    [
      MessageType.ON_USER_UPDATE,
      {
        serialize(msg: UserMessage, data: IDataWriter) {
          data.writeString(msg.user);
          data.writeByte(msg.action === "join" ? 1 : 0);
          for (const user of msg.users) {
            data.writeString(user);
          }
          data.writeString("");
        },
        deserialize(data, w) {
          let offset = w;
          const [user, newOffset] = decodeToString(data, offset);
          offset = newOffset;
          const action = data[offset++] === 1 ? "join" : "leave";
          const users: string[] = [];
          do {
            const [usr, off] = decodeToString(data, offset);
            offset = off;
            users.push(usr);
          } while (users[users.length - 1].length);
          users.pop();
          return [
            {
              type: MessageType.ON_USER_UPDATE,
              user,
              action,
              users,
            },
            offset,
          ];
        },
      },
    ],
  ];

  const serializerMap = new Map<MessageType, Serializer<Message>>(serializers);

  function serialize(message: Message, data: IDataWriter) {
    const serializer = serializerMap.get(message.type);
    if (!serializer) {
      return 0;
    }
    data.writeByte(message.type);
    serializer.serialize(message, data);
  }

  function deserialize(
    data: Uint8Array,
    w: number
  ): [Message | undefined, number] {
    let offset = w;
    const type = data[offset++];
    const [msg, newOffset] = serializerMap
      .get(type)
      ?.deserialize(data, offset, type) ?? [undefined, 0];
    offset = newOffset;
    return [msg, offset];
  }

  return {
    serialize,
    deserialize,
  };
}
