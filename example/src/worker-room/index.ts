import { createWorkerApp } from "napl";

function setupWorkerApp() {
  const { enterRoom, exitRoom } = createWorkerApp({
    worldId: "worker-test",
    signalWorkerUrl: new URL("./signal-room.worker.js", import.meta.url),
    programWorkerUrl: new URL("./app.worker.js", import.meta.url),
  });
  enterRoom({ room: "worker-test-room", host: "hello.dobuki.net" });
  return () => {
    exitRoom({ room: "worker-test-room", host: "hello.dobuki.net" });
  };
}

export { setupWorkerApp };
