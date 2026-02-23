import {
  captureKeyboard,
  captureMouse,
  setupPointerLockControl,
} from "../core/controls";
import { Message } from "../MessageType";

export function PointerLockComponent({
  active = true,
  sendToWorker,
}: {
  active?: boolean;
  sendToWorker(type: Message["type"], msg: Omit<Message, "type">): void;
}) {
  const { close } = setupPointerLockControl({
    sendMessage: sendToWorker,
    onPointerLock: (locked: boolean) => {
      if (locked) {
        const uncaptureouse = captureMouse(sendToWorker);
        const uncapturekeyboard = captureKeyboard(sendToWorker);
        return () => {
          uncaptureouse();
          uncapturekeyboard();
        };
      }
    },
    activateOnClick: active,
  });
  return { stop: close };
}
