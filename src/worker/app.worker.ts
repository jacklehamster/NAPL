import { workspace } from "@/core/Workspace";
import { WorkerMessageListener } from "./components/WorkerMessageListener";
import { workerRegistry } from "./components";
import { RegistryConfig } from "@/core/Registry";

export interface AppConfigMessage {
  uuid?: string;
  config: RegistryConfig;
}

console.log("Worker app loaded.");

workspace(({ hook }) => {
  hook(
    WorkerMessageListener<AppConfigMessage>,
    {},
    ({ addWorkerMessageListener }) => {
      addWorkerMessageListener((msg) => {
        if (msg.config) {
          workerRegistry.configureWorkspace(msg.config);
          if (msg.uuid) {
            self.postMessage({ type: "ack", uuid: msg.uuid });
          }
        }
      });
    },
  );
});
