/// <reference lib="webworker" />

import { MessageType, workerRegistry } from "napl";

workerRegistry.configureWorkspace({
  workspaces: [
    {
      configs: [
        ["Serializers"],
        [
          "SharedArrayBufferListener",
          { bytesToMessage: "~" },
          [
            [
              "WorkerMessageListener",
              {},
              [
                [
                  "HookListener",
                  {
                    onListener: "~addWorkerMessageListener",
                    listener: "~handleMessage",
                  },
                ],
              ],
            ],
          ],
        ],
        ["PingBackComponent", { onMessage: "~", sendMessage: "~" }],
        [
          "RoomComponent",
          { sendMessage: "~" },
          [
            [
              "EnterRoomComponent",
              {
                room: { room: "worker-test-room", host: "hello.dobuki.net" },
                enterRoom: "~",
                exitRoom: "~",
              },
              [
                [
                  "OnMessageComponent",
                  { type: MessageType.INIT, onMessage: "~", execute: "~" },
                ],
              ],
            ],
          ],
        ],
        [
          "WorkerCanvas",
          {},
          [
            [
              "WorkerMessageListener",
              {},
              [
                [
                  "HookListener",
                  {
                    onListener: "~addWorkerMessageListener",
                    listener: "~handleMessage",
                  },
                ],
              ],
            ],
            ["LineDrawComponent", { onMessage: "~", getCanvas: "~" }],
            [
              "CursorComponent",
              {},
              [
                [
                  "OnMessageComponent",
                  {
                    type: MessageType.POINTER_LOCK,
                    onMessage: "~",
                    execute: "~reset",
                  },
                ],
                [
                  "MoveCursor",
                  {
                    getCanvas: "~",
                    cursor: "~",
                  },
                  [
                    [
                      "OnMessageComponent",
                      {
                        type: MessageType.MOUSE_MOVE,
                        onMessage: "~",
                        execute: "~",
                      },
                    ],
                    [
                      "LineDrawer",
                      { getCanvas: "~" },
                      [
                        [
                          "HookListener",
                          { onListener: "~onMoveCursor", listener: "~draw" },
                        ],
                      ],
                    ],
                    [
                      "PeerCommunicator",
                      { sendMessage: "~", messageToBytes: "~" },
                    ],
                    [
                      "CrossMessageSender",
                      { type: MessageType.LINE, sendMessageAccross: "~" },
                      [
                        [
                          "HookListener",
                          { onListener: "~onMoveCursor", listener: "~send" },
                        ],
                      ],
                    ],
                  ],
                ],
              ],
            ],
          ],
        ],
      ],
    },
  ],
});
