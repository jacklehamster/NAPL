/// <reference lib="webworker" />

import { MessageType } from "napl";
import { initialize } from "napl";

const {
  sendMessage: sendMessageUp,
  enterRoom,
  addMessageListener,
} = initialize();

addMessageListener(MessageType.INIT, () => {
  const lobby = { room: "worker-test-room", host: "hello.dobuki.net" };
  enterRoom(lobby);
});

addMessageListener(MessageType.PING, (msg) => {
  sendMessageUp(MessageType.PING, msg);
});
