import { enterWorld } from "@dobuki/hello-worker";
import { setupMessenger } from "./core/messenger";
import { MessageType } from "./MessageType";
import { setupGraphics } from "./core/graphics";
import { setupControl } from "./core/controls";

interface Props {
  worldId: string;
  signalWorkerUrl?: URL;
  programWorkerUrl: URL;
  lobby?: {
    host: string;
    room: string;
  };
}

export function createWorkerApp({
  worldId,
  signalWorkerUrl,
  programWorkerUrl,
  lobby,
}: Props) {
  if (!self.crossOriginIsolated) {
    console.error(`This feature can't run in your current browser context.
      It requires Cross-Origin Isolation (COOP/COEP) to enable high-performance shared memory.
      Please reload from the official site / correct environment, or contact your admin.`);
  }
  const {
    userId,
    send: sendAcross,
    enterRoom,
    exitRoom,
    addMessageListener,
    addUserListener,
    end,
  } = enterWorld<Uint8Array | string>({ worldId, workerUrl: signalWorkerUrl });

  const worker = new Worker(programWorkerUrl, { type: "module" });

  const { sendMessage: sendToWorker, close: closeMessenger } = setupMessenger(
    worker,
    (msg) => {
      if (msg.type === MessageType.PING) {
        console.log("Ping", (performance.now() - msg.now).toFixed(2) + "ms");
      }
      if (msg.type === MessageType.LINE) {
        sendAcross(JSON.stringify(msg));
      }
    },
  );
  const { unhook: unhookGraphics } = setupGraphics(worker);
  const { close: closeControls } = setupControl({ sendMessage: sendToWorker });

  const removeUserListener = addUserListener((user, action, users) => {
    sendToWorker(MessageType.ON_USER_UPDATE, {
      user,
      action,
      users,
    });
  });
  const removeMessageListener = addMessageListener((data, from) => {
    if (typeof data === "string") {
      const obj = JSON.parse(data);
      sendToWorker(obj.type, obj);
      return;
    }
    sendToWorker(MessageType.ON_MESSAGE, {
      data,
      from,
    });
  });

  setTimeout(() => {
    const now = performance.now();
    sendToWorker(MessageType.PING, { now });
  }, 1000);

  // const onMessage = (e: MessageEvent<WorkerResponse>) => {
  //   const { action } = e.data;
  //   switch (action) {
  //     case "send":
  //       sendAcross(e.data.data, e.data.peer);
  //       break;
  //     case "close":
  //       close();
  //       break;
  //     case "enterRoom":
  //       enterRoom({ room: e.data.room, host: e.data.host });
  //       break;
  //     case "exitRoom":
  //       exitRoom({ room: e.data.room, host: e.data.host });
  //       break;
  //   }
  // };
  // worker.addEventListener("message", onMessage);

  if (lobby) {
    enterRoom(lobby);
  }

  return {
    close() {
      // worker.removeEventListener("message", onMessage);
      removeUserListener();
      removeMessageListener();
      closeControls();
      unhookGraphics();
      closeMessenger();
      end();
      if (lobby) {
        exitRoom(lobby);
      }
    },
  };
}
