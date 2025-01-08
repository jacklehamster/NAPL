import { Update } from "@/types/Update";
import { ISharedData } from "./ISharedData";
import { SocketClient } from "./SocketClient";
import { getLeafObject } from "@/data-update";
import { Observer } from "./Observer";

export class SubData implements ISharedData {
  readonly parts: (string | number)[];
  constructor(path: Update["path"], readonly socketClient: SocketClient) {
    this.parts = Array.isArray(path) ? path : path.split("/");
  }

  observe(paths: Update["path"][], callback: (values: any[]) => void): Observer {
    const updatedPaths = paths.map(path => {
      const parts = path === undefined ? [] : Array.isArray(path) ? path : path.split("/");
      return [...this.parts, ...parts];
    });
    return this.socketClient.observe(updatedPaths, callback);
  }

  async setData(path: Update["path"], value: any, options: { passive?: boolean; }): Promise<void> {
    await this.socketClient.waitForConnection();
    const parts = path === undefined ? [] : Array.isArray(path) ? path : path.split("/");
    return this.socketClient.setData([...this.parts, ...parts], value, options);
  }

  get state(): Record<string, any> {
    return getLeafObject(this.socketClient.state, this.parts, 0, false) ?? {};
  }
}