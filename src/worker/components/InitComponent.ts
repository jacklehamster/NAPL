import { initialize } from "../CommInterface.worker";
import { Message } from "@/app/MessageType";

export function InitComponent({
  bytesToMessage,
}: {
  bytesToMessage: (data: Uint8Array) => Message | undefined;
}) {
  const { sendMessage, getCanvas, onMessage, close } = initialize({
    bytesToMessage,
  });

  return {
    onMessage,
    sendMessage,
    getCanvas,
    stop() {
      close();
    },
  };
}
