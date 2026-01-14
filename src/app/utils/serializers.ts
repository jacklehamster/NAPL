import { UserMessage } from "../MessageType";
import { KeyMessage } from "../MessageType";
import { MessageType } from "../MessageType";
import { Message } from "../MessageType";
import { PingMessage } from "../MessageType";
import { IDataReader, IDataWriter } from "./data-ring";

export function hookSerializers() {
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
      data: IDataReader,
      type: MessageType.KEY_UP | MessageType.KEY_DOWN
    ) => {
      const key = data.readString();
      const bits = data.readByte();
      const altKey = (bits & (1 << 0)) !== 0;
      const ctrlKey = (bits & (1 << 1)) !== 0;
      const metaKey = (bits & (1 << 2)) !== 0;
      const shiftKey = (bits & (1 << 3)) !== 0;
      const repeat = (bits & (1 << 4)) !== 0;
      return {
        type,
        key,
        altKey,
        ctrlKey,
        metaKey,
        shiftKey,
        repeat,
      };
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
        deserialize(data: IDataReader) {
          const now = data.readFloat64();
          return { type: MessageType.PING, now };
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
        deserialize(data) {
          const user = data.readString();
          const action = data.readByte() === 1 ? "join" : "leave";
          const users: string[] = [];
          do {
            const usr = data.readString();
            users.push(usr);
          } while (users[users.length - 1].length);
          users.pop();
          return {
            type: MessageType.ON_USER_UPDATE,
            user,
            action,
            users,
          };
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

  function deserialize(data: IDataReader): Message | undefined {
    const type = data.readByte();
    return serializerMap.get(type)?.deserialize(data, type);
  }

  return {
    serialize,
    deserialize,
  };
}
export interface Serializer<M extends Message> {
  serialize(msg: M, data: IDataWriter): void;
  deserialize(data: IDataReader, type: MessageType): M;
}
