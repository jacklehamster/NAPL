import { hookMessenger } from "../../app/core/messenger";
import { Message, MessageType } from "../../app/MessageType";
import { hookMsgListener } from "../../app/utils/listener";
import { MessageHandler } from "./OnMessageComponent";

export interface SharedArrayBufferWorkerMessage {
  sab?: {
    toWorker: SharedArrayBuffer;
    fromWorker: SharedArrayBuffer;
  };
}

export function SharedArrayBufferListener({
  bytesToMessage,
}: {
  bytesToMessage: (data: Uint8Array) => Message | undefined;
}) {
  let sendMessageCallback:
    | null
    | (<M extends Message>(type: M["type"], msg: Omit<M, "type">) => void) =
    null;

  const messageListeners = new Map<MessageType, MessageHandler<any>[]>();

  function triggerListeners(msg: Message, peer?: string) {
    messageListeners.get(msg.type)?.forEach((callback) => callback(msg, peer));
  }

  function handleMessage(msg: SharedArrayBufferWorkerMessage) {
    if (msg.sab) {
      const { toWorker, fromWorker } = msg.sab;
      const { sendMessage } = hookMessenger(fromWorker);
      const { listen } = hookMsgListener();
      sendMessageCallback = sendMessage;
      listen(toWorker, (msg) => {
        //  Process incoming message from main thread
        if (msg.type === MessageType.ON_PEER_MESSAGE) {
          //  Message from peer. Deserializing inner message
          const m = bytesToMessage(msg.data);
          if (!m) {
            console.warn("Failed to deserialize peer message");
            return;
          }
          triggerListeners(m, msg.from);
          return;
        }
        triggerListeners(msg);
      });

      triggerListeners({ type: MessageType.INIT });
    }
  }
  return {
    handleMessage,
    sendMessage<M extends Message>(type: M["type"], msg: Omit<M, "type">) {
      sendMessageCallback?.(type, msg);
    },
    onMessage<M extends Message>(type: M["type"], callback: MessageHandler<M>) {
      const listeners =
        messageListeners.get(type) ??
        (() => {
          const arr: MessageHandler<M>[] = [];
          messageListeners.set(type, arr);
          return arr;
        })();

      listeners.push(callback);
      return () => {
        listeners.splice(listeners.indexOf(callback), 1);
        if (listeners.length === 0) {
          messageListeners.delete(type);
        }
      };
    },
    stop() {
      messageListeners.clear();
    },
  };
}
