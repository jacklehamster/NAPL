import { MessageType } from "../MessageType";

export type KeyMessage = {
  type: MessageType.KEY_DOWN | MessageType.KEY_UP;
} & Pick<
  KeyboardEvent,
  "key" | "ctrlKey" | "altKey" | "metaKey" | "shiftKey" | "repeat"
>;
