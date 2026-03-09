/// <reference lib="webworker" />

import {
  hookSerializers,
  MessageType,
  PingBackComponent,
  RoomComponent,
  workspace,
} from "napl";
import { initialize } from "napl";

workspace(({ hook }) => {
  const { bytesToMessage } = hookSerializers();
  const { sendMessage: sendMessageUp, onMessage } = initialize({
    bytesToMessage,
  });

  hook(RoomComponent, { sendMessage: sendMessageUp }, ({ enterRoom }) => {
    const offInit = onMessage(MessageType.INIT, () => {
      const lobby = { room: "worker-test-room", host: "hello.dobuki.net" };
      enterRoom(lobby);
    });

    hook(PingBackComponent, { onMessage, sendMessage: sendMessageUp });

    return () => {
      offInit();
    };
  });
});
