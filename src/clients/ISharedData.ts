import { SetDataOptions } from "../cycles/data-update/SetDataOptions";
import { UpdateOptions } from "../cycles/data-update/UpdateOptions";

export interface ISharedData {
  clientId: string;
  state: Record<string, any>;
  getData(path: string): any;
  setData(path: string, value: any, options?: SetDataOptions): void;
  pushData(path: string, value: any, options?: UpdateOptions): void;
}
