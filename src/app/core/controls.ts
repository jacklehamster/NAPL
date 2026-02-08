import { Message, MessageType } from "../MessageType";
import { hookPointerLock } from "../utils/pointer-lock-hook";

export function captureMouse(
  sendMessage: <M extends Message>(
    type: M["type"],
    msg: Omit<M, "type">,
  ) => void,
) {
  function onMouseMove(e: MouseEvent) {
    sendMessage(MessageType.MOUSE_MOVE, e);
  }
  function onMouseDown(e: MouseEvent) {
    sendMessage(MessageType.MOUSE_DOWN, e);
    document.exitPointerLock();
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
  return () => {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mousedown", onMouseDown);
    document.removeEventListener("mouseup", onMouseUp);
    document.removeEventListener("wheel", onWheel);
    document.removeEventListener("contextmenu", handleContextMenu);
  };
}

export function captureKeyboard(
  sendMessage: <M extends Message>(
    type: M["type"],
    msg: Omit<M, "type">,
  ) => void,
) {
  function onKeyDown(e: KeyboardEvent) {
    sendMessage(MessageType.KEY_DOWN, e);
  }
  function onKeyUp(e: KeyboardEvent) {
    sendMessage(MessageType.KEY_UP, e);
  }

  document.addEventListener("keydown", onKeyDown);
  document.addEventListener("keyup", onKeyUp);
  return () => {
    document.removeEventListener("keydown", onKeyDown);
    document.removeEventListener("keyup", onKeyUp);
  };
}

export function setupPointerLockControl({
  sendMessage,
  onPointerLock,
  activateOnClick,
}: {
  activateOnClick?: boolean;
  sendMessage: <M extends Message>(
    type: M["type"],
    msg: Omit<M, "type">,
  ) => void;
  onPointerLock?: (locked: boolean) => (() => void) | void;
}) {
  const { enterPointerLock } = hookPointerLock(() => {
    sendMessage(MessageType.POINTER_LOCK, { enter: true });
    const onExitPointerLock = onPointerLock?.(true);
    return () => {
      sendMessage(MessageType.POINTER_LOCK, { enter: false });
      onExitPointerLock?.();
      onPointerLock?.(false);
    };
  });

  if (activateOnClick) {
    document.addEventListener("mousedown", enterPointerLock);
  }

  return {
    close: () => {
      document.removeEventListener("mousedown", enterPointerLock);
    },
    enterPointerLock,
  };
}
