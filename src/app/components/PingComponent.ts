import { Message, MessageType } from "../MessageType";
import { Component } from "./Component";

type PingProps = {
  period?: number;
  sendToWorker(msg: MessageType.PING, prop: { now: number }): void;
  onWorkerMessage(listener: (msg: Message) => void): () => void;
};

export const PingComponent: Component<PingProps> = ({
  period = 1000,
  sendToWorker,
  onWorkerMessage,
}: PingProps) => {
  const interval = setInterval(() => {
    const now = performance.now();
    sendToWorker(MessageType.PING, { now });
  }, period);

  const removeWorkerMessageListener = onWorkerMessage((msg) => {
    switch (msg.type) {
      case MessageType.PING:
        console.log("ping", (performance.now() - msg.now).toFixed(2) + "ms");
        break;
    }
  });

  return {
    stop: () => {
      clearInterval(interval);
      removeWorkerMessageListener();
    },
  };
};
