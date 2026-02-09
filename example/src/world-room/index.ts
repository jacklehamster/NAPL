import { createWorkerApp } from "napl";

function setupWorkerApp() {
  createWorkerApp({
    worldId: "world",
    signalWorkerUrl: new URL("../signal-room.worker.js", import.meta.url),
    programWorkerUrl: new URL("./app.worker.js", import.meta.url),
    config: {},
  });
}

export { setupWorkerApp };
