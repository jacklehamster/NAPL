import { Message } from "@/app/MessageType";

export function CrossMessageSender<M extends Message>({
  type,
  sendMessageAccross,
}: {
  type: M["type"];
  sendMessageAccross(msg: Message, peer?: string): void;
}) {
  return {
    send(msg: Omit<M, "type">, peer?: string) {
      sendMessageAccross({ type, ...msg } as M, peer);
    },
  };
}
