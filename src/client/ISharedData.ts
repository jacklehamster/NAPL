import { Update } from "@/types/Update";
import { Observer } from "./Observer";

export interface ISharedData {
  setData(path: Update["path"], value: any, options: {
    passive?: boolean,
  }): Promise<void>;
  state: Record<string, any>;
  observe(paths: Update["path"][], callback: (values: any[]) => void): Observer;
}
