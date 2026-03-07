import { enterWorld } from "@dobuki/hello-worker";
import { Message, MessageType } from "../MessageType";

export function PeerComponent({
  worldId,
  signalWorkerUrl,
  addWorkerMessageListener,
  sendToWorker,
}: {
  worldId: string;
  signalWorkerUrl?: URL;
  addWorkerMessageListener: (callback: (msg: Message) => void) => () => void;
  sendToWorker(type: Message["type"], msg: Omit<Message, "type">): void;
}) {
  const {
    userId,
    send: sendAcross,
    enterRoom,
    exitRoom,
    addMessageListener,
    addUserListener,
    end,
  } = enterWorld<ArrayBufferView, ArrayBufferLike>({
    worldId,
    workerUrl: signalWorkerUrl,
    logLine: console.log,
  });

  const removeWorkerMessageListener = addWorkerMessageListener((msg) => {
    switch (msg.type) {
      case MessageType.ON_PEER_MESSAGE:
        sendAcross(msg.data, msg.from);
        break;
      case MessageType.ENTER_ROOM:
        enterRoom({ room: msg.room, host: msg.host });
        break;
      case MessageType.EXIT_ROOM:
        exitRoom({ room: msg.room, host: msg.host });
        break;
    }
  });

  const removeUserListener = addUserListener((user, action, users) => {
    sendToWorker(MessageType.ON_USER_UPDATE, { user, action, users });
  });

  const removeMessageListener = addMessageListener((data, from) => {
    const d = new Uint8Array(data);
    sendToWorker(MessageType.ON_PEER_MESSAGE, { data: d, from });
  });

  return {
    userId,
    stop: () => {
      removeWorkerMessageListener();
      removeUserListener();
      removeMessageListener();
      end();
    },
  };
}
