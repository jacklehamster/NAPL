import { MessageType } from "../MessageType";

export type CommMessage = {
  type: MessageType.ON_USER_UPDATE;
  user: string;
  action: "join" | "leave";
  users: string[];
};
