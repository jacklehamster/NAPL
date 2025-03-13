import { DataBinder } from "@/cycles/data-binding/DataBinder";
import { Data } from "@/types/Data";


export interface RegistryEntry {
  parent: Data | Array<any>;
  prop: string;
  path: string;
  dataBinder?: DataBinder;
}
