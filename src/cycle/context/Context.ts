import { Data } from "@/types/Data";
import { Update } from "@/types/Update";

export interface Context {
  secret?: string;
  skipValidation?: boolean;
  localTimeOffset?: number;
  clientId?: string;
  root: Data;
  outgoingUpdates: Update[];
  properties: { [key: string]: any };
}

export function createContext(root: Data, properties: Record<string, any> = {}): Context {
  return {
    root,
    properties,
    outgoingUpdates: [],
  };
}
