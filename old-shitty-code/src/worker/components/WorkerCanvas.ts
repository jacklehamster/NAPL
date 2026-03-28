import { WorkerCommand } from "../WorkerCommand";

export type CanvasWorkerMessage = {
  canvas?: OffscreenCanvas;
  width?: number;
  height?: number;
  dpr?: number;
} & WorkerCommand;

export function WorkerCanvas() {
  let canvas: OffscreenCanvas | undefined;

  function handleMessage(msg: CanvasWorkerMessage) {
    if (msg.canvas) {
      canvas = msg.canvas;
      const { width, height, dpr } = msg;
      if (width && height) {
        canvas.width = width * (dpr ?? 1);
        canvas.height = height * (dpr ?? 1);
      }
    }
    if (msg.type === "resize") {
      if (canvas) {
        const dpr = msg.dpr ?? 1;
        canvas.width = msg.width * dpr;
        canvas.height = msg.height * dpr;
        return;
      }
    }
  }

  return {
    getCanvas() {
      return canvas;
    },
    handleMessage,
  };
}
