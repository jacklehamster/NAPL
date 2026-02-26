/// <reference lib="webworker" />

import { hookMessenger } from "@/app/core/messenger";
import { Message, MessageType } from "@/app/MessageType";
import { hookMsgListener } from "@/app/utils/listener";
import { WorkerCommand } from "./WorkerCommand";
import { hookSerializers } from "@/app/utils/serializers";

export function initialize({
  onMessage,
  onReady,
}: {
  onMessage: (msg: Message, peer?: string) => void;
  onReady: ({
    sendMessage,
  }: {
    sendMessage: <M extends Message>(
      type: M["type"],
      msg: Omit<M, "type">,
    ) => void;
  }) => void;
}) {
  // let program: IProgram | undefined;
  // const messageListeners = new Array<(data: Uint8Array) => void>();
  // const newUserListener = new Array<(user: string) => void>();
  let sendMessage: <M extends Message>(
    type: M["type"],
    msg: Omit<M, "type">,
  ) => void;

  let canvas: OffscreenCanvas | undefined;

  const { messageToBytes, bytesToMessage } = hookSerializers();

  const { listen } = hookMsgListener();

  // class CommInterfaceWorker implements CommInterface {
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
        listen(toWorker, (msg) => {
          //  Process incoming message from main thread
          if (msg.type === MessageType.ON_PEER_MESSAGE) {
            //  Message from peer. Deserializing inner message
            const m = bytesToMessage(msg.data);

            if (!m) {
              console.warn("Failed to deserialize peer message");
              return;
            }
            onMessage(m, msg.from);
            return;
          }

          onMessage(msg);
        });
        const result = hookMessenger(fromWorker);
        sendMessage = result.sendMessage;
        onReady(result);
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
    enterRoom({ room, host }: { room: string; host: string }) {
      sendMessage?.(MessageType.ENTER_ROOM, { room, host });
    },
    exitRoom({ room, host }: { room: string; host: string }) {
      sendMessage?.(MessageType.EXIT_ROOM, { room, host });
    },
  };
}
