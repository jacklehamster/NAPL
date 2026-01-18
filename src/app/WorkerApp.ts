import { WorkerResponse } from "@/worker/WorkerResponse";
import { enterWorld } from "@dobuki/hello-worker";
import { setupMessenger } from "./core/messenger";
import { MessageType } from "./MessageType";
import { setupGraphics } from "./core/graphics";
import { setupControl } from "./core/controls";

interface Props {
  worldId: string;
  signalWorkerUrl?: URL;
  programWorkerUrl: URL;
}

export function createWorkerApp({
  worldId,
  signalWorkerUrl,
  programWorkerUrl,
}: Props) {
  if (!self.crossOriginIsolated) {
    throw new Error(`This feature can’t run in your current browser context.
      It requires Cross-Origin Isolation (COOP/COEP) to enable high-performance shared memory.
      Please reload from the official site / correct environment, or contact your admin.`);
  }
  const {
    userId,
    send,
    enterRoom,
    exitRoom,
    addMessageListener,
    addUserListener,
    end,
  } = enterWorld<Uint8Array>({ worldId, workerUrl: signalWorkerUrl });

  const worker = new Worker(programWorkerUrl, { type: "module" });

  const { sendMessage: sendToWorker } = setupMessenger(worker);
  const { unhook: unhookGraphics } = setupGraphics(worker);
  const { close: unhookControls } = setupControl({ sendMessage: sendToWorker });

  const removeUserListener = addUserListener((user, action, users) => {
    sendToWorker(MessageType.ON_USER_UPDATE, {
      user,
      action,
      users,
    });
  });
  const removeMessageListener = addMessageListener((data, from) => {
    sendToWorker(MessageType.ON_MESSAGE, {
      data,
      from,
    });
  });

  setTimeout(() => {
    const now = performance.now();
    sendToWorker(MessageType.PING, { now });
  }, 1000);

  const onMessage = (e: MessageEvent<WorkerResponse>) => {
    const { action } = e.data;
    switch (action) {
      case "send":
        send(e.data.data, e.data.peer);
        break;
      case "close":
        close();
        break;
      case "enterRoom":
        enterRoom({ room: e.data.room, host: e.data.host });
        break;
      case "exitRoom":
        exitRoom({ room: e.data.room, host: e.data.host });
        break;
      case "ping":
        console.log("Ping", `${performance.now() - e.data.now}ms`);
        break;
    }
  };
  worker.addEventListener("message", onMessage);

  function close() {
    worker.removeEventListener("message", onMessage);
    removeUserListener();
    removeMessageListener();
    unhookControls();
    end();
    unhookGraphics();
  }

  return {
    close,
  };
}
