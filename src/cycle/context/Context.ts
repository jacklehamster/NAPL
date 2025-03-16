import { Observer } from "@/cycle/data/observer/Observer";
import { Registry } from "@/cycle/data/registry/Registry";
import { Data } from "@/types/Data";

export interface Context {
  root: Data;
  updatedPaths: Record<string, any>;
  properties: { [key: string]: any };
  registry: Registry;
  observers: Record<string, Observer[]>;
}

export function createCycleData(root: Data, properties: Record<string, any> = {}): Context {
  return {
    root,
    updatedPaths: {},
    properties,
    registry: new Registry(),
    observers: {}
  };
}
