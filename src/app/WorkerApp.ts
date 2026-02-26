import { enterWorld } from "@dobuki/hello-worker";
import { hookWorkerMessageListener } from "./core/messenger";
import { MessageType } from "./MessageType";
import { setupGraphics } from "./core/graphics";
import {
  captureKeyboard,
  captureMouse,
  setupPointerLockControl,
} from "./core/controls";

interface Props {
  worldId: string;
  signalWorkerUrl?: URL;
  programWorkerUrl: URL;
  config?: {
    usePointerLock?: boolean;
  };
}

export function createWorkerApp({
  worldId,
  signalWorkerUrl,
  programWorkerUrl,
  config = {},
}: Props) {
  if (!self.crossOriginIsolated) {
    console.error(`This feature can't run in your current browser context.
      It requires Cross-Origin Isolation (COOP/COEP) to enable high-performance shared memory.
      Please reload from the official site / correct environment, or contact your admin.`);
  }
  const worker = new Worker(programWorkerUrl, { type: "module" });

  const {
    userId,
    send: sendAcross,
    enterRoom,
    exitRoom,
    addMessageListener,
    addUserListener,
    end,
  } = enterWorld<ArrayBufferView, ArrayBufferLike>({
    worldId,
    workerUrl: signalWorkerUrl,
    logLine: console.log,
  });

  //  Cross connection
  const {
    sendMessage: sendToWorker,
    close: closeMessenger,
    addMessageListener: addWorkerMessageListener,
  } = hookWorkerMessageListener(worker);

  const removeWorkerMessageListener = addWorkerMessageListener((msg) => {
    switch (msg.type) {
      case MessageType.PING:
        console.log("ping", (performance.now() - msg.now).toFixed(2) + "ms");
        break;
      case MessageType.ON_PEER_MESSAGE:
        sendAcross(msg.data, msg.from);
        break;
      case MessageType.ENTER_ROOM:
        enterRoom({ room: msg.room, host: msg.host });
        break;
      case MessageType.EXIT_ROOM:
        exitRoom({ room: msg.room, host: msg.host });
        break;
    }
  });

  const { unhook: unhookGraphics } = setupGraphics(worker);

  const removeUserListener = addUserListener((user, action, users) => {
    sendToWorker(MessageType.ON_USER_UPDATE, { user, action, users });
  });

  const removeMessageListener = addMessageListener((data, from) => {
    const d = new Uint8Array(data);
    sendToWorker(MessageType.ON_PEER_MESSAGE, { data: d, from });
  });

  //  Pointer Lock
  const { close: closeControls } = setupPointerLockControl({
    sendMessage: sendToWorker,
    onPointerLock: (locked: boolean) => {
      if (locked) {
        const uncaptureouse = captureMouse(sendToWorker);
        const uncapturekeyboard = captureKeyboard(sendToWorker);
        return () => {
          uncaptureouse();
          uncapturekeyboard();
        };
      }
    },
    activateOnClick: config.usePointerLock,
  });

  //  Ping
  setTimeout(() => {
    const now = performance.now();
    sendToWorker(MessageType.PING, { now });
  }, 1000);

  return {
    userId,
    close() {
      removeUserListener();
      removeMessageListener();
      removeWorkerMessageListener();
      closeControls();
      unhookGraphics();
      closeMessenger();
      end();
    },
  };
}
