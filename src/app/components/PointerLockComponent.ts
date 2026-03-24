import {
  captureKeyboard,
  captureMouse,
  setupPointerLockControl,
} from "../core/controls";
import { Message } from "../MessageType";

export function PointerLockComponent({
  sendToWorker,
}: {
  sendToWorker(type: Message["type"], msg: Omit<Message, "type">): void;
}) {
  const { enterPointerLock } = setupPointerLockControl({
    sendMessage: sendToWorker,
    onPointerLock: (locked: boolean) => {
      if (locked) {
        const uncapturemouse = captureMouse(sendToWorker);
        const uncapturekeyboard = captureKeyboard(sendToWorker);
        return () => {
          uncapturemouse();
          uncapturekeyboard();
        };
      }
    },
  });
  return { enterPointerLock };
}
