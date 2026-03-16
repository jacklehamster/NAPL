/// <reference lib="webworker" />

import {
  CanvasWorkerMessage,
  EnterRoomComponent,
  HookListener,
  MessageType,
  OnMessageComponent,
  PingBackComponent,
  RoomComponent,
  Serializers,
  SharedArrayBufferListener,
  SharedArrayBufferWorkerMessage,
  WorkerCanvas,
  WorkerMessageListener,
  workspace,
} from "napl";

workspace(({ hook }) => {
  const { bytesToMessage } = hook(Serializers);
  hook(WorkerCanvas, {}, ({ handleMessage }) => {
    hook(
      WorkerMessageListener<CanvasWorkerMessage>,
      {},
      ({ addWorkerMessageListener }) => {
        hook(HookListener<typeof handleMessage>, {
          onListener: addWorkerMessageListener,
          listener: handleMessage,
        });
      },
    );

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
