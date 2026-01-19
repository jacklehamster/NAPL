export enum MessageType {
  //  ToWorker
  KEY_DOWN,
  KEY_UP,
  ON_USER_UPDATE,
  ON_MESSAGE,
  MOUSE_MOVE,
  MOUSE_DOWN,
  MOUSE_UP,
  WHEEL,
  POINTER_LOCK,
  //  Both
  PING,
  //  FromWorker
  LINE,
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

export type LineMessage = {
  type: MessageType.LINE;
  from: { x: number; y: number };
  to: { x: number; y: number };
  color: string;
  lineWidth: number;
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
  | LineMessage;
