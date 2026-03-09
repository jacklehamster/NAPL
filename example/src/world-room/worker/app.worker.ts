/// <reference lib="webworker" />

import {
  EnterRoomComponent,
  hookSerializers,
  MessageType,
  OnMessageComponent,
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

  hook(
    RoomComponent,
    { sendMessage: sendMessageUp },
    ({ enterRoom, exitRoom }) => {
      hook(
        EnterRoomComponent,
        {
          room: {
            room: "world-test-room",
            host: "hello.dobuki.net",
          },
          enterRoom,
          exitRoom,
        },
        ({ execute }) => {
          hook(OnMessageComponent, {
            type: MessageType.INIT,
            onMessage,
            execute,
          });
        },
      );

      hook(PingBackComponent, { onMessage, sendMessage: sendMessageUp });
    },
  );
});
