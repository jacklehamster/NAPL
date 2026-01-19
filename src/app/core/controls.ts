import { Message, MessageType } from "../MessageType";
import { hookPointerLock } from "../utils/pointer-lock-hook";

export function setupControl({
  sendMessage,
}: {
  sendMessage: <M extends Message>(
    type: M["type"],
    msg: Omit<M, "type">,
  ) => void;
}) {
  const { enterPointerLock } = hookPointerLock(() => {
    function onKeyDown(e: KeyboardEvent) {
      sendMessage(MessageType.KEY_DOWN, e);
    }
    function onKeyUp(e: KeyboardEvent) {
      sendMessage(MessageType.KEY_UP, e);
    }
    function onMouseMove(e: MouseEvent) {
      sendMessage(MessageType.MOUSE_MOVE, e);
    }
    function onMouseDown(e: MouseEvent) {
      sendMessage(MessageType.MOUSE_DOWN, e);
    }
    function onMouseUp(e: MouseEvent) {
      sendMessage(MessageType.MOUSE_UP, e);
    }
    function onWheel(e: WheelEvent) {
      e.preventDefault();
      sendMessage(MessageType.WHEEL, e);
    }
    function handleContextMenu(e: PointerEvent) {
      e.preventDefault();
    }

    // start reading movementX/Y
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("wheel", onWheel, { passive: false });
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);
    sendMessage(MessageType.POINTER_LOCK, { enter: true });
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("wheel", onWheel);
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("keyup", onKeyUp);
      sendMessage(MessageType.POINTER_LOCK, { enter: false });
    };
  });

  document.addEventListener("mousedown", enterPointerLock);

  function close() {
    document.removeEventListener("mousedown", enterPointerLock);
  }

  return { close };
}
