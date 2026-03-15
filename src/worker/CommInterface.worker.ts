/// <reference lib="webworker" />

import { Message } from "@/app/MessageType";
import { WorkerCommand } from "./WorkerCommand";

export type MessageHandler<M extends Message> = (msg: M, peer?: string) => void;

export function initialize() {
  let canvas: OffscreenCanvas | undefined;

  self.addEventListener(
    "message",
    (
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
    },
  );

  return {
    getCanvas() {
      return canvas;
    },
  };
}
