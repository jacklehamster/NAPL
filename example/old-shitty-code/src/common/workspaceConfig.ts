import { registry } from "napl";
import { signalWorkerUrl } from "./signalWorker";

export function loadWorkspace(root: HTMLElement, config: any) {
  console.log(JSON.parse(JSON.stringify(config, null, " ")));
  return registry
    .withContext({
      signalWorkerUrl,
      programWorkerUrl: new URL("./app.worker.js", import.meta.url),
    })
    .configureWorkspace(config, root);
}
