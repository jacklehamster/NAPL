import { hookMsgListener } from "@/app/utils/listener";
import { WorkerCommand } from "./WorkerCommand";
import { Message } from "@/app/MessageType";
import { hookMessenger } from "@/app/core/messenger";
import {
  hookCallback,
  hookEffect,
  hookMemo,
  hookRef,
  hookState,
} from "./hooks/hookEffect";

export function hookWorkerListener() {
  console.log("HOOK WORKER LISTENER");
  const { listen } = hookMsgListener();
  const [toWorkerBuffer, setToWorkerBuffer] =
    hookState<SharedArrayBuffer | null>(null);
  const [fromWorkerBuffer, setFromWorkerBuffer] =
    hookState<SharedArrayBuffer | null>(null);
  const messageListeners = hookRef<Array<(msg: Message) => void>>([]);

  // Setup message listening
  hookEffect(() => {
    if (!toWorkerBuffer) return;
    const stopListen = listen(toWorkerBuffer, (msg) => {
      messageListeners.current.forEach((listener) => listener(msg));
    });
    return () => {
      stopListen();
    };
  }, [toWorkerBuffer, fromWorkerBuffer]);

  const { sendMessage: sendMessageMessenger } = hookMessenger(fromWorkerBuffer);

  // Setup sendMessage function
  const sendMessage = hookCallback(
    (msg: Message) => {
      if (!fromWorkerBuffer) return;
      sendMessageMessenger?.(msg.type, msg);
    },
    [fromWorkerBuffer, sendMessageMessenger],
  );

  //  Listen for SharedArrayBuffers from the main thread
  hookEffect(() => {
    const messageListener = (
      e: MessageEvent<
        WorkerCommand & {
          sab?: {
            toWorker: SharedArrayBuffer;
            fromWorker: SharedArrayBuffer;
          };
        }
      >,
    ) => {
      const msg = e.data;
      if (msg.sab) {
        const { toWorker, fromWorker } = msg.sab;
        setToWorkerBuffer(toWorker);
        setFromWorkerBuffer(fromWorker);
      }
    };
    self.addEventListener("message", messageListener);
    return () => {
      self.removeEventListener("message", messageListener);
    };
  }, []);

  console.log(">>>>>>>>>>>>>");
  const addMessageListener = hookCallback(
    (listener: (msg: Message) => void) => {
      messageListeners.current.push(listener);
      return () => {
        const index = messageListeners.current.indexOf(listener);
        if (index !== -1) {
          messageListeners.current.splice(index, 1);
        }
      };
    },
    [],
  );

  return {
    sendMessage,
    addMessageListener,
  };
}
