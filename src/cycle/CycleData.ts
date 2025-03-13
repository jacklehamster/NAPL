import { Registry } from "@/core/Registry";
import { Data } from "@/types/Data";

export interface CycleData {
  root: Data;
  updatedPaths: Set<string>;
  properties: { [key: string]: any };
  registry: Registry;
}
