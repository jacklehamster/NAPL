import { workspace } from "./components/Component";
import { PingComponent } from "./components/PingComponent";
import { PointerLockComponent } from "./components/PointerLockComponent";
import { WorkerComponent } from "./components/WorkerComponent";
import { PeerComponent } from "./components/PeerComponent";
import { GraphicsComponent } from "./components/GraphicsComponent";

interface Props {
  worldId: string;
  signalWorkerUrl?: URL;
  programWorkerUrl: URL;
  config?: {
    usePointerLock?: boolean;
  };
}

export function createWorkerApp({
  worldId,
  signalWorkerUrl,
  programWorkerUrl,
  config = {},
}: Props) {
  if (!self.crossOriginIsolated) {
    console.error(`This feature can't run in your current browser context.
      It requires Cross-Origin Isolation (COOP/COEP) to enable high-performance shared memory.
      Please reload from the official site / correct environment, or contact your admin.`);
  }

  const close = workspace(({ hook }) => {
    hook<typeof WorkerComponent>(
      WorkerComponent,
      {
        programWorkerUrl,
      },
      ({ sendToWorker, addWorkerMessageListener, hook, worker }) => {
        hook(PeerComponent, {
          worldId,
          signalWorkerUrl,
          sendToWorker,
          addWorkerMessageListener,
        });
        hook(GraphicsComponent, { worker });
        hook(PointerLockComponent, {
          active: config.usePointerLock,
          sendToWorker,
        });
        hook(PingComponent, { sendToWorker, addWorkerMessageListener });
      },
    );
  });

  return {
    close,
  };
}
