import { Data } from "@/types/Data";

export interface CycleData {
  root: Data;
  updatedPaths: Set<string>;
  properties: { [key: string]: any };
}
