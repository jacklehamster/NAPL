import { Update } from "@/types/Update";
import { ISharedData, SetDataOptions } from "./ISharedData";
import { SocketClient } from "./SocketClient";
import { Observer } from "./Observer";

export class ClientData implements ISharedData {
  id: string = "";
  constructor(readonly socketClient: SocketClient) {
  }

  observe(paths: Update["path"][]): Observer {
    const updatedPaths = paths.map(path => {
      const parts = Array.isArray(path) ? path : path.split("/");
      return ["clients", "self", ...parts];
    });
    return this.socketClient.observe(updatedPaths);
  }

  async setData(path: Update["path"], value: any, options: SetDataOptions): Promise<void> {
    await this.socketClient.waitForConnection();
    const parts = Array.isArray(path) ? path : path.split("/");
    return this.socketClient.setData(["clients", this.id ?? "", ...parts], value, options);
  }

  get state() {
    return this.socketClient.state.clients?.[this.id] ?? {};
  }
}
