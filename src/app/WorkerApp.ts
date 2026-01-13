import { WorkerCommand } from "@/worker/WorkerCommand";
import { WorkerResponse } from "@/worker/WorkerResponse";
import { enterWorld } from "@dobuki/hello-worker";
import { setupMessenger } from "./utils/messenger";
import { MessageType } from "./MessageType";
import { PingMessage } from "./MessageType";
import { UserMessage } from "./MessageType";

interface Props {
  appId: string;
  signalWorkerUrl?: URL;
  programWorkerUrl: URL;
}

export function createWorkerApp({
  appId,
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
  } = enterWorld<Uint8Array>({ appId, workerUrl: signalWorkerUrl });

  enterRoom({ room: "lobby", host: "hello.dobuki.net" });

  const worker = new Worker(programWorkerUrl, { type: "module" });

  const { sendMessage } = setupMessenger(worker);

  document.addEventListener(
    "keydown",
    ({ key, altKey, ctrlKey, metaKey, shiftKey, repeat }) => {
      sendMessage({
        type: MessageType.KEY_DOWN,
        key,
        altKey,
        ctrlKey,
        metaKey,
        shiftKey,
        repeat,
      });
    }
  );
  document.addEventListener(
    "keyup",
    ({ key, altKey, ctrlKey, metaKey, shiftKey, repeat }) => {
      sendMessage({
        type: MessageType.KEY_UP,
        key,
        altKey,
        ctrlKey,
        metaKey,
        shiftKey,
        repeat,
      });
    }
  );

  function sendToWorker(msg: WorkerCommand) {
    worker.postMessage(msg, msg.data ? [msg.data] : []);
  }

  const removeUserListener = addUserListener((user, action, users) => {
    sendMessage<UserMessage>({
      type: MessageType.ON_USER_UPDATE,
      user,
      action,
      users,
    });
  });
  const removeMessageListener = addMessageListener((data, from) => {
    sendToWorker({
      type: "onMessage",
      data,
      from,
    });
  });

  sendToWorker({
    type: "createApp",
    userId,
    appId,
  });

  setTimeout(() => {
    const now = performance.now();
    console.log(now);
    sendMessage<PingMessage>({
      type: MessageType.PING,
      now,
    });
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
    end();
  }

  return {
    close,
  };
}
