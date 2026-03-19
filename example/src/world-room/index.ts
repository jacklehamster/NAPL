import {
  GraphicsComponent,
  PeerComponent,
  PingComponent,
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
          worldId: "world",
          signalWorkerUrl: new URL("../signal-room.worker.js", import.meta.url),
          sendToWorker,
          onWorkerMessage,
        });
        hook(GraphicsComponent, { worker });
        hook(PingComponent, { sendToWorker, onWorkerMessage });
      },
    );
  });
}

export { setupWorkerApp };
