import { MouseMessage } from "@/app/MessageType";
import { Cursor } from "./CursorComponent";

export function MoveCursor({
  cursor,
  getCanvas,
}: {
  cursor: Cursor;
  getCanvas: () => OffscreenCanvas | undefined;
}) {
  const moveListeners = new Set<(msg: { from: Cursor; to: Cursor }) => void>();

  return {
    onMoveCursor(callback: (msg: { from: Cursor; to: Cursor }) => void) {
      moveListeners.add(callback);
      return () => {
        moveListeners.delete(callback);
      };
    },
    stop() {
      moveListeners.clear();
    },
    execute(msg: MouseMessage) {
      if (cursor.needsReset) {
        cursor.x = msg.clientX * 2;
        cursor.y = msg.clientY * 2;
        cursor.needsReset = false;
      }
      const ctx = getCanvas()?.getContext("2d");

      if (ctx && (msg.movementX !== 0 || msg.movementY !== 0)) {
        const from: Cursor = { ...cursor };

        const newLineWidth =
          Math.sqrt(
            Math.sqrt(
              msg.movementX * msg.movementX + msg.movementY * msg.movementY,
            ),
          ) * 2;
        cursor.x += msg.movementX;
        cursor.y += msg.movementY;
        cursor.x = Math.max(0, Math.min(ctx.canvas.width, cursor.x));
        cursor.y = Math.max(0, Math.min(ctx.canvas.height, cursor.y));
        cursor.width = newLineWidth;

        moveListeners.forEach((callback) => callback({ from, to: cursor }));
      }
    },
  };
}
