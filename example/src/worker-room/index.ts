import { createWorkerApp } from "napl";

function setupWorkerApp() {
  return createWorkerApp({
    worldId: "worker-test",
    signalWorkerUrl: new URL("./signal-room.worker.js", import.meta.url),
    programWorkerUrl: new URL("./app.worker.js", import.meta.url),
    lobby: {
      room: "worker-test-room",
      host: "hello.dobuki.net",
    },
  });
}

export { setupWorkerApp };
