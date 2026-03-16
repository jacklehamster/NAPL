import { Message, MessageType } from "@/app/MessageType";
import { MessageHandler } from "./OnMessageComponent";

export function PingBackComponent({
  onMessage,
  sendMessage,
}: {
  onMessage: <M extends Message>(
    type: MessageType,
    callback: MessageHandler<M>,
  ) => () => void;
  sendMessage: <M extends Message>(
    type: M["type"],
    msg: Omit<M, "type">,
  ) => void;
}) {
  const offPing = onMessage(MessageType.PING, (msg) => {
    sendMessage(MessageType.PING, msg);
  });
  return {
    stop() {
      offPing();
    },
  };
}
