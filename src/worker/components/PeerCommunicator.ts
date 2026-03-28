import { Message, MessageType } from "../../app/MessageType";

export function PeerCommunicator({
  sendMessage,
  messageToBytes,
}: {
  sendMessage: <M extends Message>(
    type: M["type"],
    msg: Omit<M, "type">,
  ) => void;
  messageToBytes(msg: Message): Uint8Array;
}) {
  return {
    sendMessageAccross(msg: Message, peer?: string) {
      const data = messageToBytes(msg);
      sendMessage?.(MessageType.ON_PEER_MESSAGE, { data, from: peer });
    },

    stop() {},
  };
}
