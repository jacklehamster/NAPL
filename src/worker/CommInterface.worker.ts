/// <reference lib="webworker" />

import { Message, MessageType } from "@/app/MessageType";
import { generateRandomHexColor } from "@/app/utils/drawing";
import { hookWorkerListener } from "./messenger.worker";
import { hookCallback, hookEffect, startHook } from "./hooks/hookEffect";
import { hookGraphics } from "./graphics.worker";
// function respond(response: WorkerResponse) {
//   (self as DedicatedWorkerGlobalScope).postMessage(
//     response,
//     response.data ? [response.data] : []
//   );
// }

export function initialize(): void {
  startHook(() => {
    let cursor = {
      x: 0,
      y: 0,
      needsReset: true,
      color: "black",
      width: 1,
    };

    const { canvas } = hookGraphics();

    const { sendMessage, addMessageListener } = hookWorkerListener();
    console.log("Addmessagelistener", addMessageListener);

    const onMessage = hookCallback(
      (msg: Message) => {
        if (msg.type === MessageType.POINTER_LOCK) {
          cursor.needsReset = true;
          cursor.color = generateRandomHexColor();
        }
        if (msg.type === MessageType.LINE) {
          const ctx = canvas?.getContext("2d");
          if (ctx) {
            ctx.lineWidth = msg.lineWidth;
            ctx.beginPath();
            ctx.moveTo(msg.from.x, msg.from.y);
            ctx.strokeStyle = msg.color;
            ctx.lineTo(msg.to.x, msg.to.y);
            ctx.stroke();
          }
        }
        if (msg.type === MessageType.MOUSE_MOVE) {
          if (cursor.needsReset) {
            cursor.x = msg.clientX * 2;
            cursor.y = msg.clientY * 2;
            cursor.needsReset = false;
          }
          const ctx = canvas?.getContext("2d");

          if (ctx) {
            const newLineWidth = (ctx.lineWidth =
              Math.sqrt(
                Math.sqrt(
                  msg.movementX * msg.movementX + msg.movementY * msg.movementY,
                ),
              ) * 2);
            ctx.beginPath();
            ctx.moveTo(cursor.x, cursor.y);
            const from = { x: cursor.x, y: cursor.y };
            ctx.lineWidth = newLineWidth;
            cursor.x += msg.movementX;
            cursor.y += msg.movementY;
            cursor.x = Math.max(0, Math.min(ctx.canvas.width, cursor.x));
            cursor.y = Math.max(0, Math.min(ctx.canvas.height, cursor.y));
            ctx.strokeStyle = cursor.color;
            ctx.lineTo(cursor.x, cursor.y);
            ctx.stroke();
            sendMessage?.({
              type: MessageType.LINE,
              from,
              to: { x: cursor.x, y: cursor.y },
              color: ctx.strokeStyle,
              lineWidth: ctx.lineWidth,
            });
          }
        }
        if (msg.type === MessageType.PING) {
          sendMessage?.(msg);
        }
      },
      [sendMessage, canvas],
    );
    console.log("OnMessage", onMessage);

    hookEffect(() => {
      const removeListener = addMessageListener(onMessage);
      return () => {
        removeListener();
      };
    }, [onMessage, addMessageListener]);

    // // class CommInterfaceWorker implements CommInterface {
    // //   constructor() {}
    // //   send(data: Uint8Array, peer?: string): void {
    // //     respond({ action: "send", data, peer });
    // //   }
    // //   close(): void {
    // //     respond({ action: "close" });
    // //   }
    // //   onMessage(listener: (data: Uint8Array) => void): () => void {
    // //     messageListeners.push(listener);
    // //     return () => {
    // //       messageListeners.splice(messageListeners.indexOf(listener), 1);
    // //     };
    // //   }
    // //   onNewClient(listener: (peer: string) => void): () => void {
    // //     newUserListener.push(listener);
    // //     return () => {
    // //       newUserListener.splice(newUserListener.indexOf(listener), 1);
    // //     };
    // //   }
    // // }
    // self.addEventListener(
    //   "message",
    //   (
    //     e: MessageEvent<
    //       WorkerCommand & {
    //         sab?: {
    //           toWorker: SharedArrayBuffer;
    //           fromWorker: SharedArrayBuffer;
    //         };
    //         canvas?: OffscreenCanvas;
    //         width?: number;
    //         height?: number;
    //         dpr?: number;
    //       }
    //     >,
    //   ) => {
    //     // if (msg.type === "createApp") {
    //     //   if (program) {
    //     //     throw new Error("Can only create program once");
    //     //   }
    //     //   program = new Program({
    //     //     appId: msg.appId,
    //     //     userId: msg.userId,
    //     //     comm: new CommInterfaceWorker(),
    //     //   });
    //     //   console.log(program);
    //     // }
    //     //  else if (msg.type === "onMessage") {
    //     //   messageListeners.forEach((listener) => listener(msg.data));
    //     // } else if (msg.type === "onUserUpdate") {
    //     //   if (msg.action === "join") {
    //     //     newUserListener.forEach((listener) => listener(msg.user));
    //     //   } else if (msg.action === "leave") {
    //     //     program?.setData(`users/${msg.user}`, undefined);
    //     //   }
    //     // } else if (msg.type === "ping") {
    //     //   respond({ action: "ping", now: msg.now });
    //     // }
    //   },
    // );
  });
}
