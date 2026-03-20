/// <reference lib="webworker" />

import { MessageType, workerRegistry } from "napl";

workerRegistry.configureWorkspace({
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
      ],
    ],
  ],
});
