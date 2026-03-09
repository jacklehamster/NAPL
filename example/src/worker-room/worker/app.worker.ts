/// <reference lib="webworker" />

import {
  Cursor,
  CursorComponent,
  EnterRoomComponent,
  InitComponent,
  LineDrawComponent,
  MessageType,
  MouseMessage,
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

              onMoveCursor(({ from, to }) => {
                const ctx = getCanvas()?.getContext("2d");
                if (!ctx) return;

                ctx.beginPath();
                ctx.moveTo(from.x, from.y);
                ctx.lineWidth = to.width;
                ctx.strokeStyle = to.color;
                ctx.lineTo(to.x, to.y);
                ctx.stroke();
              });

              hook(
                PeerCommunicator,
                { sendMessage, messageToBytes },
                ({ sendMessageAccross }) => {
                  onMoveCursor(({ from, to }) =>
                    sendMessageAccross({ type: MessageType.LINE, from, to }),
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
