import { Message, MessageType } from "@/app/MessageType";
export type MessageHandler<M extends Message> = (msg: M, peer?: string) => void;

export function OnMessageComponent({
  type,
  execute,
  onMessage,
}: {
  type: MessageType;
  execute: (msg: Message) => void;
  onMessage: <M extends Message>(
    type: MessageType,
    callback: MessageHandler<M>,
  ) => () => void;
}) {
  const offMessage = onMessage(type, (msg) => {
    execute(msg);
  });
  return {
    stop() {
      offMessage();
    },
  };
}
