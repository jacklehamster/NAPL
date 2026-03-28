import { hookWorkerMessageListener } from "../core/messenger";

export const WorkerSabCommunicator = ({ worker }: { worker: Worker }) => {
  //  Cross connection
  const {
    sendMessage: sendToWorker,
    close,
    onWorkerMessage,
  } = hookWorkerMessageListener(worker);

  return { worker, sendToWorker, onWorkerMessage, stop: close };
};
