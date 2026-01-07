import { WorkerCommand, WorkerResponse } from "@/worker/CommInterface.worker";
import { enterWorld } from "@dobuki/hello-worker";

interface Props {
  appId: string;
  helloWorkerUrl?: URL;
  programWorkerUrl: URL;
}

export function createWorkerApp({
  appId,
  helloWorkerUrl,
  programWorkerUrl,
}: Props) {
  const {
    userId,
    send,
    enterRoom,
    exitRoom,
    addMessageListener,
    addUserListener,
    end,
  } = enterWorld({ appId, workerUrl: helloWorkerUrl });
  const worker = new Worker(programWorkerUrl, { type: "module" });
  function sendToWorker(msg: WorkerCommand) {
    worker.postMessage(msg, msg.data ? [msg.data] : []);
  }

  const removeUserListener = addUserListener((user, action, users) => {
    sendToWorker({
      type: "onUserUpdate",
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

  function close() {
    removeUserListener();
    removeMessageListener();
    end();
  }

  worker.addEventListener("message", (e: MessageEvent<WorkerResponse>) => {
    const { action } = e.data;
    switch (action) {
      case "send":
        send(e.data.data, e.data.peer);
        break;
      case "close":
        close();
        break;
      case "enterRoom":
        enterRoom({
          room: e.data.room,
          host: e.data.host,
        });
        break;
      case "exitRoom":
        exitRoom({ room: e.data.room, host: e.data.host });
        break;
    }
  });
}
