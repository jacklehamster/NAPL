import { createWorkerApp } from "napl";

function setupWorkerApp() {
  const workerApp = createWorkerApp({
    appId: "worker-test",
    signalWorkerUrl: new URL("./signal-room.worker.js", import.meta.url),
    programWorkerUrl: new URL("./app.worker.js", import.meta.url),
  });
}

export { setupWorkerApp };
