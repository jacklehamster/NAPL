import { hookWorkerMessageListener } from "../core/messenger";

export const WorkerComponent = (config: { programWorkerUrl: URL }) => {
  const worker = new Worker(config.programWorkerUrl, { type: "module" });
  //  Cross connection
  const {
    sendMessage: sendToWorker,
    close,
    addMessageListener: addWorkerMessageListener,
  } = hookWorkerMessageListener(worker);

  return { worker, sendToWorker, addWorkerMessageListener, stop: close };
};
