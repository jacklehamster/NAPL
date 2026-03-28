import { Message, MessageType } from "../../app/MessageType";

export function RoomComponent({
  sendMessage,
}: {
  sendMessage: <M extends Message>(
    type: M["type"],
    msg: Omit<M, "type">,
  ) => void;
}) {
  return {
    enterRoom({ room, host }: { room: string; host: string }) {
      sendMessage?.(MessageType.ENTER_ROOM, { room, host });
    },
    exitRoom({ room, host }: { room: string; host: string }) {
      sendMessage?.(MessageType.EXIT_ROOM, { room, host });
    },
  };
}
