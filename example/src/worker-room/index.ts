import { registry } from "napl";
import { signalWorkerUrl } from "../common/signalWorker";

function setupWorkerApp() {
  return registry
    .withContext({
      signalWorkerUrl,
      programWorkerUrl: new URL("./worker/app.worker.js", import.meta.url),
    })
    .configureWorkspace({
      workspaces: [
        {
          configs: [
            [
              "WorkerComponent",
              { programWorkerUrl: "~" },
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
                  [["ActivateOnClick", { listener: "~enterPointerLock" }]],
                ],
                ["PingComponent", { sendToWorker: "~", onWorkerMessage: "~" }],
              ],
            ],
          ],
        },
      ],
    });
}

export { setupWorkerApp };
