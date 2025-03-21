import { Data } from "@/types/Data";

export interface Context {
  secret?: string;
  skipValidation?: boolean;
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
