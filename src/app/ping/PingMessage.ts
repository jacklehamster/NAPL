import { MessageType } from "../MessageType";

export type PingMessage = {
  type: MessageType.PING;
  now: number;
};
