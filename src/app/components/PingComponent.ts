import { Peng } from "@/peng/Peng";
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
  function sendPingPeng() {
    // Generate a Peng that will go to worker and come back to main thread, to test the communication latency
    const peng: Peng = Peng.create().setTasks([
      { type: "timer", description: "Start timer at performance.now()" },
      {
        type: "travel",
        details: { target: "worker" },
        description: "Go to worker",
      },
      { type: "confirm", description: "Confirm arrival to worker" },
      {
        type: "travel",
        details: { target: "main" },
        description: "Go back to main thread",
      },
      { type: "report", description: "Report duration of travel" },
    ]);
  }

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
