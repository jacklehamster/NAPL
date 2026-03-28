import { Data } from "../../napl";

export function WorkerPostMessageComponent({ worker }: { worker: Worker }) {
  const ackListeners: Record<string, (data?: Data) => void> = {};

  const listener = ({
    data,
  }: MessageEvent<{ type: "ack"; uuid: string; data?: Data }>) => {
    if (data.type === "ack") {
      ackListeners[data.uuid]?.(data.data);
      delete ackListeners[data.uuid];
    }
  };
  worker.addEventListener("message", listener);

  return {
    postMessage(
      payload: Record<string, Data>,
      onReturn?: (data?: Data) => void,
    ) {
      const uuid = onReturn ? crypto.randomUUID() : undefined;
      if (onReturn && uuid) {
        ackListeners[uuid] = onReturn;
      }
      worker.postMessage({ ...payload, uuid });
    },
    stop() {
      worker.removeEventListener("message", listener);
    },
  };
}
