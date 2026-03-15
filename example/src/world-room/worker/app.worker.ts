/// <reference lib="webworker" />

import {
  EnterRoomComponent,
  HookListener,
  InitComponent,
  MessageType,
  OnMessageComponent,
  PingBackComponent,
  RoomComponent,
  Serializers,
  SharedArrayBufferListener,
  SharedArrayBufferWorkerMessage,
  WorkerMessageListener,
  workspace,
} from "napl";

workspace(({ hook }) => {
  const { bytesToMessage } = hook(Serializers);
  hook(InitComponent, {}, () => {
    const { sendMessage, onMessage } = hook(
      SharedArrayBufferListener,
      { bytesToMessage },
      ({ handleMessage }) => {
        hook(
          WorkerMessageListener<SharedArrayBufferWorkerMessage>,
          {},
          ({ addWorkerMessageListener }) => {
            hook(HookListener<typeof handleMessage>, {
              onListener: addWorkerMessageListener,
              listener: handleMessage,
            });
          },
        );
      },
    );

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
