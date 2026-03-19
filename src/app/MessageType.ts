import { Peng, Task } from "@/peng/Peng";
import { Cursor } from "@/worker/components";

export enum MessageType {
  //  Internal
  INIT,
  //  ToWorker
  KEY_DOWN,
  KEY_UP,
  ON_USER_UPDATE,
  ON_PEER_MESSAGE,
  MOUSE_MOVE,
  MOUSE_DOWN,
  MOUSE_UP,
  WHEEL,
  POINTER_LOCK,
  //  Both
  PING,
  //  FromWorker
  LINE,
  ENTER_ROOM,
  EXIT_ROOM,
  //  Peng
  PENG,
}

export type InitMessage = { type: MessageType.INIT };
export type UserMessage = {
  type: MessageType.ON_USER_UPDATE;
  user: string;
  action: "join" | "leave";
  users: string[];
};
export type MsgMessage = {
  type: MessageType.ON_PEER_MESSAGE;
  data: Uint8Array;
  from?: string;
};
export type KeyMessage = {
  type: MessageType.KEY_DOWN | MessageType.KEY_UP;
} & Pick<
  KeyboardEvent,
  "key" | "ctrlKey" | "altKey" | "metaKey" | "shiftKey" | "repeat"
>;
export type PingMessage = {
  type: MessageType.PING;
  now: number;
};
export type MouseMessage = {
  type: MessageType.MOUSE_MOVE | MessageType.MOUSE_DOWN | MessageType.MOUSE_UP;
} & Pick<
  MouseEvent,
  | "movementX"
  | "movementY"
  | "button"
  | "buttons"
  | "altKey"
  | "ctrlKey"
  | "shiftKey"
  | "metaKey"
  | "clientX"
  | "clientY"
>;
export type WheelMessage = { type: MessageType.WHEEL } & Pick<
  WheelEvent,
  | "deltaX"
  | "deltaY"
  | "deltaZ"
  | "deltaMode"
  | "altKey"
  | "ctrlKey"
  | "metaKey"
  | "shiftKey"
>;
export type PointerMessage = { type: MessageType.POINTER_LOCK; enter: boolean };

export type LineMessage = {
  type: MessageType.LINE;
  from: Omit<Cursor, "needsReset">;
  to: Omit<Cursor, "needsReset">;
};

export type RoomMessage = {
  type: MessageType.ENTER_ROOM | MessageType.EXIT_ROOM;
  host: string;
  room: string;
};

export type PengMessage = {
  type: MessageType.PENG;
  pengs: Peng[];
};

// All messages
export type Message =
  | KeyMessage
  | PingMessage
  | UserMessage
  | MsgMessage
  | MouseMessage
  | WheelMessage
  | PointerMessage
  | LineMessage
  | RoomMessage
  | InitMessage
  | PengMessage;
