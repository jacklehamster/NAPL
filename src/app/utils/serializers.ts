import { CommMessage } from "../comm/CommMessage";
import { KeyMessage } from "../input/KeyMessage";
import { MessageType } from "../MessageType";
import { Message, Serializer } from "../messenger";
import { PingMessage } from "../ping/PingMessage";
import { hookStringEncoder } from "./StringEncoder";

export function hookSerializers() {
  const { encodeString, decodeToString } = hookStringEncoder();

  const keySerializer: Serializer<KeyMessage> = {
    serialize: (msg: KeyMessage, data: Uint8Array) => {
      let offset = 0;
      offset += encodeString(msg.key, data);
      const bits =
        (msg.altKey ? 1 << 0 : 0) |
        (msg.ctrlKey ? 1 << 1 : 0) |
        (msg.metaKey ? 1 << 2 : 0) |
        (msg.shiftKey ? 1 << 3 : 0) |
        (msg.repeat ? 1 << 4 : 0);
      data[offset++] = bits;
      return offset;
    },
    deserialize: (
      data: Uint8Array,
      type: MessageType.KEY_UP | MessageType.KEY_DOWN
    ) => {
      let offset = 0;
      const [key, shift] = decodeToString(data);
      offset += shift;
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
        serialize(msg: PingMessage, data: Uint8Array) {
          const dv = new DataView(
            data.buffer,
            data.byteOffset,
            data.byteLength
          );
          let offset = 0;
          dv.setUint32(offset, msg.now);
          offset += 4;
          return offset;
        },
        deserialize(data: Uint8Array) {
          const dv = new DataView(
            data.buffer,
            data.byteOffset,
            data.byteLength
          );
          let offset = 0;
          const now = dv.getUint32(offset, true);
          offset += 4;
          return [{ type: MessageType.PING, now }, offset];
        },
      },
    ],
    [
      MessageType.ON_USER_UPDATE,
      {
        serialize(msg: CommMessage, data: Uint8Array) {
          let offset = 0;
          offset += encodeString(msg.user, data.subarray(offset));
          data[offset++] = msg.action === "join" ? 1 : 0;
          for (const user of msg.users) {
            offset += encodeString(user, data.subarray(offset));
          }
          offset += encodeString("", data.subarray(offset));
          return offset;
        },
        deserialize(data) {
          let offset = 0;
          const [user, bytesConsumed] = decodeToString(data.subarray(offset));
          offset += bytesConsumed;
          const action = data[offset++] === 1 ? "join" : "leave";
          const users: string[] = [];
          do {
            const [usr, consumed] = decodeToString(data.subarray(offset));
            offset += consumed;
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

  function serialize(message: Message, data: Uint8Array) {
    const serializer = serializerMap.get(message.type);
    if (!serializer) {
      return 0;
    }
    let offset = 0;
    data[offset++] = message.type;
    offset += serializer.serialize(message, data.subarray(1)) ?? 0;
    return offset;
  }

  function deserialize(data: Uint8Array): [Message | undefined, number] {
    let offset = 0;
    const type = data[offset++];
    const [msg, bytesConsumed] = serializerMap
      .get(type)
      ?.deserialize(data.subarray(1), type) ?? [undefined, 0];
    offset += bytesConsumed;
    return [msg, offset];
  }

  return {
    serialize,
    deserialize,
  };
}
