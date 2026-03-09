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
  workspace,
} from "napl";

workspace(({ hook }) => {
  hook(Serializers, {}, ({ messageToBytes, bytesToMessage }) => {
    hook(
      InitComponent,
      { bytesToMessage },
      ({ sendMessage, getCanvas, onMessage }) => {
        hook(PingBackComponent, { onMessage, sendMessage });
        hook(
          RoomComponent,
          { sendMessage },
          ({ enterRoom, exitRoom, hook }) => {
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
          },
        );

        hook(LineDrawComponent, { onMessage, getCanvas });

        hook(CursorComponent, {}, ({ cursor, reset }) => {
          hook(OnMessageComponent, {
            type: MessageType.POINTER_LOCK,
            onMessage,
            execute: reset,
          });

          hook(
            MoveCursor,
            { getCanvas, cursor },
            ({ execute, onMoveCursor }) => {
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
            },
          );
        });
      },
    );
  });
});
