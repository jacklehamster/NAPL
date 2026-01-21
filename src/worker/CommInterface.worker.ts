/// <reference lib="webworker" />

import { WorkerCommand } from "./WorkerCommand";
import { hookMessenger } from "@/app/core/messenger";
import { DataRingReader, DataRingWriter } from "@/app/utils/data-ring";
import { Message, MessageType } from "@/app/MessageType";
import { hookMsgListener } from "@/app/utils/listener";

// function respond(response: WorkerResponse) {
//   (self as DedicatedWorkerGlobalScope).postMessage(
//     response,
//     response.data ? [response.data] : []
//   );
// }

export function initialize(): void {
  // let program: IProgram | undefined;
  // const messageListeners = new Array<(data: Uint8Array) => void>();
  // const newUserListener = new Array<(user: string) => void>();
  let sendMessage: <M extends Message>(
    type: M["type"],
    msg: Omit<M, "type">,
  ) => void;

  let canvas: OffscreenCanvas | undefined;
  let cursor = {
    x: 0,
    y: 0,
    needsReset: true,
    color: "black",
  };

  function generateRandomHexColor() {
    // Generate a random number between 0 and 0xFFFFFF
    let randomNum = Math.floor(Math.random() * 0xffffff);

    // Convert the number to a hexadecimal string
    let hexColor = randomNum.toString(16);

    // Pad the string with leading zeros if necessary to ensure it is 6 digits long
    let fullHexColor = hexColor.padStart(6, "0");

    return `#${fullHexColor.toUpperCase()}`; // Prepend '#' and convert to uppercase
  }

  const { listen } = hookMsgListener();

  // class CommInterfaceWorker implements CommInterface {
  //   constructor() {}
  //   send(data: Uint8Array, peer?: string): void {
  //     respond({ action: "send", data, peer });
  //   }
  //   close(): void {
  //     respond({ action: "close" });
  //   }
  //   onMessage(listener: (data: Uint8Array) => void): () => void {
  //     messageListeners.push(listener);
  //     return () => {
  //       messageListeners.splice(messageListeners.indexOf(listener), 1);
  //     };
  //   }
  //   onNewClient(listener: (peer: string) => void): () => void {
  //     newUserListener.push(listener);
  //     return () => {
  //       newUserListener.splice(newUserListener.indexOf(listener), 1);
  //     };
  //   }
  // }

  self.addEventListener(
    "message",
    (
      e: MessageEvent<
        WorkerCommand & {
          sabToWorker?: SharedArrayBuffer;
          sabFromWorker?: SharedArrayBuffer;
          canvas?: OffscreenCanvas;
          width?: number;
          height?: number;
          dpr?: number;
        }
      >,
    ) => {
      const msg = e.data;
      if (msg.sabToWorker) {
        const sab = msg.sabToWorker;
        const ctrl = new Int32Array(sab, 0, 8);
        const data = new DataRingReader(new Uint8Array(sab, 32));
        listen(ctrl, data, (msg) => {
          // console.log({
          //   ...msg,
          //   type: MessageType[msg.type],
          // });
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
              ctx.beginPath();
              ctx.moveTo(cursor.x, cursor.y);
              const from = { x: cursor.x, y: cursor.y };
              ctx.lineWidth =
                Math.sqrt(
                  Math.sqrt(
                    msg.movementX * msg.movementX +
                      msg.movementY * msg.movementY,
                  ),
                ) * 2;
              cursor.x += msg.movementX;
              cursor.y += msg.movementY;
              cursor.x = Math.max(0, Math.min(ctx.canvas.width, cursor.x));
              cursor.y = Math.max(0, Math.min(ctx.canvas.height, cursor.y));
              ctx.strokeStyle = cursor.color;
              ctx.lineTo(cursor.x, cursor.y);
              ctx.stroke();
              sendMessage(MessageType.LINE, {
                from,
                to: { x: cursor.x, y: cursor.y },
                color: ctx.strokeStyle,
                lineWidth: ctx.lineWidth,
              });
            }
          }
          if (msg.type === MessageType.PING) {
            sendMessage(MessageType.PING, { now: msg.now });
          }
        });
      }
      if (msg.sabFromWorker) {
        const sab = msg.sabFromWorker;
        const ctrl = new Int32Array(sab, 0, 8);
        const data = new DataRingWriter(new Uint8Array(sab, 32));
        const result = hookMessenger(ctrl, data);
        sendMessage = result.sendMessage;
      }
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

      // if (msg.type === "createApp") {
      //   if (program) {
      //     throw new Error("Can only create program once");
      //   }
      //   program = new Program({
      //     appId: msg.appId,
      //     userId: msg.userId,
      //     comm: new CommInterfaceWorker(),
      //   });
      //   console.log(program);
      // }
      //  else if (msg.type === "onMessage") {
      //   messageListeners.forEach((listener) => listener(msg.data));
      // } else if (msg.type === "onUserUpdate") {
      //   if (msg.action === "join") {
      //     newUserListener.forEach((listener) => listener(msg.user));
      //   } else if (msg.action === "leave") {
      //     program?.setData(`users/${msg.user}`, undefined);
      //   }
      // } else if (msg.type === "ping") {
      //   respond({ action: "ping", now: msg.now });
      // }
    },
  );
}
