/// <reference lib="webworker" />

import {
  EnterRoomComponent,
  InitComponent,
  MessageType,
  OnMessageComponent,
  PingBackComponent,
  RoomComponent,
  Serializers,
  workspace,
} from "napl";

workspace(({ hook }) => {
  hook(Serializers, {}, ({ bytesToMessage }) => {
    hook(InitComponent, { bytesToMessage }, ({ sendMessage, onMessage }) => {
      hook(RoomComponent, { sendMessage }, ({ enterRoom, exitRoom }) => {
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
        hook(PingBackComponent, { onMessage, sendMessage });
      });
    });
  });
});
