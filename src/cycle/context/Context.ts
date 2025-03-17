import { Data } from "@/types/Data";

export interface Context {
  root: Data;
  properties: { [key: string]: any };
}

export function createContext(root: Data, properties: Record<string, any> = {}): Context {
  return {
    root,
    properties,
  };
}
