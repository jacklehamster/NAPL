import { Update } from "@/types/Update";
import { Observer } from "./Observer";

export interface SetDataOptions {
  passive?: boolean;
  room?: string;
}

export interface ISharedData {
  setData(path: Update["path"], value: any, options: SetDataOptions): Promise<void>;
  state: Record<string, any>;
  observe(paths: Update["path"][]): Observer;
}
