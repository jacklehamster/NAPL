import { Data } from "@/types/Data";

export interface Context {
  secret?: string;
  localTimeOffset?: number;
  clientId?: string;
  root: Data;
  properties: { [key: string]: any };
}

export function createContext(root: Data, properties: Record<string, any> = {}): Context {
  return {
    root,
    properties,
  };
}
