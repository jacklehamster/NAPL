import { Peng } from "@/peng/Peng";
import { hookWorkerMessageListener } from "../core/messenger";

export const WorkerComponent = (config: { programWorkerUrl: URL }) => {
  const worker = new Worker(config.programWorkerUrl, { type: "module" });
  //  Cross connection
  const {
    sendMessage: sendToWorker,
    close,
    onWorkerMessage,
  } = hookWorkerMessageListener(worker);

  function handlePeng(peng: Peng) {
    const task = peng.tasks[peng.currentTaskIndex];
    if (task.type === "travel" && task.details?.target === "worker") {
    }
  }

  return { worker, sendToWorker, onWorkerMessage, handlePeng, stop: close };
};
