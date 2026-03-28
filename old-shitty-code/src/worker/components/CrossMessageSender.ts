import { Message } from "../../app/MessageType";

interface Props<M extends Message> {
  type: M["type"];
  sendMessageAccross(msg: M, peer?: string): void;
}

export function CrossMessageSender<M extends Message>({
  type,
  sendMessageAccross,
}: Props<M>) {
  return {
    send(msg: Omit<M, "type">, peer?: string) {
      sendMessageAccross({ type, ...msg } as M, peer);
    },
  };
}
