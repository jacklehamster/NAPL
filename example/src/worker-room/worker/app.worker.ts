/// <reference lib="webworker" />

import {
  CrossMessageSender,
  CursorComponent,
  EnterRoomComponent,
  HookListener,
  InitComponent,
  LineDrawComponent,
  LineDrawer,
  MessageType,
  MoveCursor,
  OnMessageComponent,
  PeerCommunicator,
  PingBackComponent,
  RoomComponent,
  Serializers,
  SharedArrayBufferListener,
  SharedArrayBufferWorkerMessage,
  WorkerMessageListener,
  workspace,
} from "napl";

workspace(({ hook }) => {
  hook(Serializers, {}, ({ messageToBytes, bytesToMessage }) => {
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

    hook(InitComponent, {}, ({ getCanvas }) => {
      hook(PingBackComponent, { onMessage, sendMessage });
      const { enterRoom, exitRoom } = hook(RoomComponent, { sendMessage });
      hook(
        EnterRoomComponent,
        {
          room: {
            room: "worker-test-room",
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

      hook(LineDrawComponent, { onMessage, getCanvas });

      hook(CursorComponent, {}, ({ cursor, reset }) => {
        hook(OnMessageComponent, {
          type: MessageType.POINTER_LOCK,
          onMessage,
          execute: reset,
        });

        hook(MoveCursor, { getCanvas, cursor }, ({ execute, onMoveCursor }) => {
          hook(OnMessageComponent, {
            type: MessageType.MOUSE_MOVE,
            onMessage,
            execute,
          });

          hook(LineDrawer, { getCanvas }, ({ draw }) => {
            hook(HookListener<typeof draw>, {
              onListener: onMoveCursor,
              listener: draw,
            });
          });

          hook(
            PeerCommunicator,
            { sendMessage, messageToBytes },
            ({ sendMessageAccross }) => {
              hook(
                CrossMessageSender,
                { type: MessageType.LINE, sendMessageAccross },
                ({ send }) => {
                  hook(HookListener<typeof send>, {
                    onListener: onMoveCursor,
                    listener: send,
                  });
                },
              );
            },
          );
        });
      });
    });
  });
});
