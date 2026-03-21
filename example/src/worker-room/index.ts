import { MessageType, registry } from "napl";
import { signalWorkerUrl } from "../common/signalWorker";

function setupWorkerApp() {
  return registry
    .withContext({
      signalWorkerUrl,
      programWorkerUrl: new URL("../app.worker.js", import.meta.url),
    })
    .configureWorkspace({
      workspaces: [
        {
          configs: [
            [
              "ContextComponent",
              {
                workerConfig: {
                  config: {
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
                          [
                            "PingBackComponent",
                            { onMessage: "~", sendMessage: "~" },
                          ],
                          [
                            "RoomComponent",
                            { sendMessage: "~" },
                            [
                              [
                                "EnterRoomComponent",
                                {
                                  room: {
                                    room: "worker-test-room",
                                    host: "hello.dobuki.net",
                                  },
                                  enterRoom: "~",
                                  exitRoom: "~",
                                },
                                [
                                  [
                                    "OnMessageComponent",
                                    {
                                      type: MessageType.INIT,
                                      onMessage: "~",
                                      execute: "~",
                                    },
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
                              [
                                "LineDrawComponent",
                                { onMessage: "~", getCanvas: "~" },
                              ],
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
                                            {
                                              onListener: "~onMoveCursor",
                                              listener: "~draw",
                                            },
                                          ],
                                        ],
                                      ],
                                      [
                                        "PeerCommunicator",
                                        {
                                          sendMessage: "~",
                                          messageToBytes: "~",
                                        },
                                      ],
                                      [
                                        "CrossMessageSender",
                                        {
                                          type: MessageType.LINE,
                                          sendMessageAccross: "~",
                                        },
                                        [
                                          [
                                            "HookListener",
                                            {
                                              onListener: "~onMoveCursor",
                                              listener: "~send",
                                            },
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
                  },
                },
              },
            ],
            [
              "WorkerLoader",
              { programWorkerUrl: "~" },
              [
                [
                  "PendingActivation",
                  {},
                  [
                    [
                      "WorkerSabCommunicator",
                      { worker: "~" },
                      [
                        [
                          "PeerComponent",
                          {
                            worldId: "worker-test",
                            signalWorkerUrl: "~",
                            sendToWorker: "~",
                            onWorkerMessage: "~",
                          },
                        ],
                        ["GraphicsComponent", { worker: "~" }],
                        [
                          "PointerLockComponent",
                          { sendToWorker: "~" },
                          [
                            [
                              "ActivateOnClick",
                              { listener: "~enterPointerLock" },
                            ],
                          ],
                        ],
                        [
                          "PingComponent",
                          { sendToWorker: "~", onWorkerMessage: "~" },
                        ],
                      ],
                    ],
                  ],
                ],
                [
                  "WorkerPostMessageComponent",
                  { worker: "~" },
                  [
                    [
                      "ActComponent",
                      {
                        action: "~postMessage",
                        param: "~workerConfig",
                        onReturn: "~activate",
                      },
                    ],
                  ],
                ],
              ],
            ],
          ],
        },
      ],
    });
}

export { setupWorkerApp };
