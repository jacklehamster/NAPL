import { Data } from "@/types/Data";
import { Update } from "@/types/Update";

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
