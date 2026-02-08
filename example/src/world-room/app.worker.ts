/// <reference lib="webworker" />

import { MessageType, Message } from "napl";
import { initialize } from "napl";

const { sendMessage: sendMessageUp, enterRoom } = initialize({
  onReady: () => {
    const lobby = { room: "worker-test-room", host: "hello.dobuki.net" };
    enterRoom(lobby);
  },
  onMessage: (msg: Message, _peer?: string) => {
    if (msg.type === MessageType.PING) {
      sendMessageUp(MessageType.PING, msg);
    }
  },
});
