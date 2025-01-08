import { Update } from "@/types/Update";
import { ISharedData } from "./ISharedData";
import { SocketClient } from "./SocketClient";
import { Observer } from "./Observer";

export class ClientData implements ISharedData {
  id: string = "";
  constructor(readonly socketClient: SocketClient) {
  }

  observe(paths: Update["path"][], callback: (values: any[]) => void): Observer {
    const updatedPaths = paths.map(path => {
      const parts = Array.isArray(path) ? path : path.split("/");
      return ["clients", "self", ...parts];
    });
    return this.socketClient.observe(updatedPaths, callback);
  }

  async setData(path: Update["path"], value: any, options: { passive?: boolean; }): Promise<void> {
    await this.socketClient.waitForConnection();
    const parts = Array.isArray(path) ? path : path.split("/");
    return this.socketClient.setData(["clients", this.id ?? "", ...parts], value, options);
  }

  get state() {
    return this.socketClient.state.clients?.[this.id] ?? {};
  }
}
