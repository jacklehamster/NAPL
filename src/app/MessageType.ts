export enum MessageType {
  KEY_DOWN = 0,
  KEY_UP = 1,
  PING = 2,
  ON_USER_UPDATE = 3,
  ON_MESSAGE = 4,
  MOUSE_MOVE = 5,
  MOUSE_DOWN = 6,
  MOUSE_UP = 7,
  WHEEL = 8,
  POINTER_LOCK = 9,
}

export type UserMessage = {
  type: MessageType.ON_USER_UPDATE;
  user: string;
  action: "join" | "leave";
  users: string[];
};
export type MsgMessage = {
  type: MessageType.ON_MESSAGE;
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

// All messages
export type Message =
  | KeyMessage
  | PingMessage
  | UserMessage
  | MsgMessage
  | MouseMessage
  | WheelMessage
  | PointerMessage;
