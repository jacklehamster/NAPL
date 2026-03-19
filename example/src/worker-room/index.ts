import {
  GraphicsComponent,
  PeerComponent,
  PingComponent,
  PointerLockComponent,
  WorkerComponent,
  workspace,
} from "napl";

function setupWorkerApp() {
  return workspace(({ hook }) => {
    hook(
      WorkerComponent,
      { programWorkerUrl: new URL("./worker/app.worker.js", import.meta.url) },
      ({ sendToWorker, onWorkerMessage, worker }) => {
        hook(PeerComponent, {
          worldId: "worker-test",
          signalWorkerUrl: new URL("../signal-room.worker.js", import.meta.url),
          sendToWorker,
          onWorkerMessage,
        });
        hook(GraphicsComponent, { worker });
        hook(PointerLockComponent, {
          active: true,
          sendToWorker,
        });
        hook(PingComponent, { sendToWorker, onWorkerMessage });
      },
    );
  });
}

export { setupWorkerApp };
