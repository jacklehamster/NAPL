import {
  LineMessage,
  MouseMessage,
  MsgMessage,
  PointerMessage,
  UserMessage,
  WheelMessage,
} from "../MessageType";
import { KeyMessage } from "../MessageType";
import { MessageType } from "../MessageType";
import { Message } from "../MessageType";
import { PingMessage } from "../MessageType";
import { DataRingWriter, IDataReader, IDataWriter } from "./data-ring";

export function hookSerializers() {
  const keySerializer: Serializer<KeyMessage> = {
    serialize: (_type, msg: KeyMessage, data: IDataWriter) => {
      data.writeString(msg.key);
      data.writeBooleans(
        msg.altKey,
        msg.ctrlKey,
        msg.metaKey,
        msg.shiftKey,
        msg.repeat,
      );
    },
    deserialize: (
      data: IDataReader,
      type: MessageType.KEY_UP | MessageType.KEY_DOWN,
    ) => {
      const key = data.readString();
      const [altKey, ctrlKey, metaKey, shiftKey, repeat] = data.readBooleans(5);
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

  const mouseSerializer: Serializer<MouseMessage> = {
    serialize(type, msg, data) {
      data.writeInt16(msg.movementX);
      data.writeInt16(msg.movementY);
      data.writeBooleans(msg.altKey, msg.ctrlKey, msg.metaKey, msg.shiftKey);
      data.writeByte(msg.buttons);
      data.writeInt16(msg.clientX);
      data.writeInt16(msg.clientY);
      if (type !== MessageType.MOUSE_MOVE) {
        data.writeByte(msg.button);
      }
    },
    deserialize(data, type) {
      const movementX = data.readInt16();
      const movementY = data.readInt16();
      const [altKey, ctrlKey, metaKey, shiftKey] = data.readBooleans(4);

      const buttons = data.readByte();
      const clientX = data.readInt16();
      const clientY = data.readInt16();
      const button = type !== MessageType.MOUSE_MOVE ? data.readByte() : -1;
      return {
        type,
        movementX,
        movementY,
        clientX,
        clientY,
        button,
        buttons,
        altKey,
        ctrlKey,
        metaKey,
        shiftKey,
      };
    },
  };

  type Pair<M extends Message = Message> = [M["type"], Serializer<M>];
  const serializers: Pair[] = [
    [MessageType.KEY_DOWN, keySerializer],
    [MessageType.KEY_UP, keySerializer],
    [
      MessageType.PING,
      {
        serialize(_type, msg: PingMessage, data: IDataWriter) {
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
        serialize(_type, msg: UserMessage, data: IDataWriter) {
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
    [MessageType.MOUSE_DOWN, mouseSerializer],
    [MessageType.MOUSE_UP, mouseSerializer],
    [MessageType.MOUSE_MOVE, mouseSerializer],
    [
      MessageType.WHEEL,
      {
        serialize(_type, msg: WheelMessage, data) {
          data.writeInt16(msg.deltaX * 256);
          data.writeInt16(msg.deltaY * 256);
          data.writeInt16(msg.deltaZ * 256);
          data.writeByte(msg.deltaMode);
          data.writeBooleans(
            msg.altKey,
            msg.ctrlKey,
            msg.metaKey,
            msg.shiftKey,
          );
        },
        deserialize(data, type: WheelMessage["type"]) {
          const deltaX = data.readInt16() / 256;
          const deltaY = data.readInt16() / 256;
          const deltaZ = data.readInt16() / 256;
          const deltaMode = data.readByte();
          const [altKey, ctrlKey, metaKey, shiftKey] = data.readBooleans(4);
          return {
            type,
            deltaX,
            deltaY,
            deltaZ,
            deltaMode,
            altKey,
            ctrlKey,
            metaKey,
            shiftKey,
          };
        },
      },
    ],
    [
      MessageType.POINTER_LOCK,
      {
        serialize(_type, msg: PointerMessage, data) {
          data.writeBooleans(msg.enter);
        },
        deserialize(data, type: PointerMessage["type"]) {
          const [enter] = data.readBooleans(1);
          return { type, enter };
        },
      },
    ],
    [
      MessageType.LINE,
      {
        serialize(_type, msg: LineMessage, data) {
          data.writeInt16(msg.from.x);
          data.writeInt16(msg.from.y);
          data.writeInt16(msg.to.x);
          data.writeInt16(msg.to.y);
          data.writeString(msg.color);
          data.writeFloat64(msg.lineWidth);
        },
        deserialize(data, type: LineMessage["type"]) {
          const from = {
            x: data.readInt16(),
            y: data.readInt16(),
          };
          const to = {
            x: data.readInt16(),
            y: data.readInt16(),
          };
          const color = data.readString();
          const lineWidth = data.readFloat64();
          return {
            type,
            from,
            to,
            color,
            lineWidth,
          };
        },
      },
    ],
    [
      MessageType.ON_PEER_MESSAGE,
      {
        serialize(_type, msg: MsgMessage, data: IDataWriter) {
          data.writeString(msg.from ?? "");
          data.writeBytes(msg.data);
        },
        deserialize(data: IDataReader) {
          const from = data.readString();
          const dataBytes = data.readBytes();
          return {
            type: MessageType.ON_PEER_MESSAGE,
            from: from.length ? from : undefined,
            data: dataBytes.slice(),
          };
        },
      },
    ],
  ];

  const serializerMap = new Map<MessageType, Serializer<Message>>(serializers);

  function serialize<M extends Message>(
    type: M["type"],
    message: Omit<M, "type">,
    data: IDataWriter,
  ) {
    const serializer = serializerMap.get(type) as Serializer<M> | undefined;
    if (!serializer) {
      return 0;
    }
    data.writeByte(type);
    serializer.serialize(type, message, data);
  }

  function deserialize(data: IDataReader): Message | undefined {
    const type = data.readByte();
    const msg = serializerMap.get(type)?.deserialize(data, type);
    return msg;
  }

  const serializerWriter = new DataRingWriter(new Uint8Array(1024));
  const messageToBytes = (msg: Message) => {
    serializerWriter.offset = 0;
    serialize(msg.type, msg, serializerWriter);
    return serializerWriter.data.subarray(0, serializerWriter.offset);
  };

  return {
    serialize,
    deserialize,
    messageToBytes,
  };
}
export interface Serializer<M extends Message> {
  serialize(type: M["type"], msg: Omit<M, "type">, data: IDataWriter): void;
  deserialize(data: IDataReader, type: M["type"]): M;
}
