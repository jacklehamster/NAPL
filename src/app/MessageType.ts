export enum MessageType {
  KEY_DOWN = 0,
  KEY_UP = 1,
  PING = 2,
  ON_USER_UPDATE = 3,
  ON_MESSAGE = 4,
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
  user?: string;
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
