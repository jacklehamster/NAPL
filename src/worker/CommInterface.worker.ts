/// <reference lib="webworker" />

import { hookMessenger } from "@/app/core/messenger";
import { Message, MessageType } from "@/app/MessageType";
import { hookMsgListener } from "@/app/utils/listener";
import { WorkerCommand } from "./WorkerCommand";
import { hookSerializers } from "@/app/utils/serializers";

// function respond(response: WorkerResponse) {
//   (self as DedicatedWorkerGlobalScope).postMessage(
//     response,
//     response.data ? [response.data] : []
//   );
// }

export function initialize(onMessage: (msg: Message) => void) {
  // let program: IProgram | undefined;
  // const messageListeners = new Array<(data: Uint8Array) => void>();
  // const newUserListener = new Array<(user: string) => void>();
  let sendMessage: <M extends Message>(
    type: M["type"],
    msg: Omit<M, "type">,
  ) => void;

  let canvas: OffscreenCanvas | undefined;

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
          sab?: {
            toWorker: SharedArrayBuffer;
            fromWorker: SharedArrayBuffer;
          };
          canvas?: OffscreenCanvas;
          width?: number;
          height?: number;
          dpr?: number;
        }
      >,
    ) => {
      const msg = e.data;
      if (msg.sab) {
        const { toWorker, fromWorker } = msg.sab;
        listen(toWorker, onMessage);
        const result = hookMessenger(fromWorker);
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

  const { messageToBytes } = hookSerializers();

  return {
    sendMessage<M extends Message>(type: M["type"], msg: Omit<M, "type">) {
      sendMessage?.(type, msg);
    },
    sendMessageAccross(msg: Message, peer?: string) {
      const data = messageToBytes(msg);
      sendMessage?.(MessageType.ON_PEER_MESSAGE, { data, from: peer });
    },
    getCanvas() {
      return canvas;
    },
  };
}
