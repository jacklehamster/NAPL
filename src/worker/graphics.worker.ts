import { hookEffect, hookState } from "./hooks/hookEffect";
import { WorkerCommand } from "./WorkerCommand";

export function hookGraphics() {
  const [canvas, setCanvas] = hookState<OffscreenCanvas | undefined>(undefined);

  hookEffect(() => {
    const messageListener = (
      e: MessageEvent<
        WorkerCommand & {
          canvas?: OffscreenCanvas;
          width?: number;
          height?: number;
          dpr?: number;
        }
      >,
    ) => {
      const msg = e.data;
      if (msg.canvas) {
        const { width, height, dpr } = msg;
        if (width && height) {
          msg.canvas.width = width * (dpr ?? 1);
          msg.canvas.height = height * (dpr ?? 1);
        }
        setCanvas(msg.canvas);
      }
      if (msg.type === "resize") {
        if (canvas) {
          const dpr = msg.dpr ?? 1;
          canvas.width = msg.width * dpr;
          canvas.height = msg.height * dpr;
          return;
        }
      }
    };
    self.addEventListener("message", messageListener);
    return () => {
      self.removeEventListener("message", messageListener);
    };
  }, [canvas]);
  return { canvas };
}
