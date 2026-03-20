import { hookWorkerMessageListener } from "../core/messenger";

export const WorkerComponent = (config: { programWorkerUrl: URL }) => {
  const worker = new Worker(config.programWorkerUrl, { type: "module" });
  //  Cross connection
  const {
    sendMessage: sendToWorker,
    close,
    onWorkerMessage,
  } = hookWorkerMessageListener(worker);

  return { worker, sendToWorker, onWorkerMessage, stop: close };
};
