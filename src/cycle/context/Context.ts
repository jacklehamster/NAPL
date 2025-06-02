import { Data } from "../../types/Data";
import { Update } from "../../types/Update";

export interface Context {
  clientId?: string;
  root: Data;
  incomingUpdates: Update[];
  outgoingUpdates: Update[];
  properties: { [key: string]: any };
}

export function createContext(root: Data, properties: Record<string, any> = {}): Context {
  return {
    root,
    properties,
    incomingUpdates: [],
    outgoingUpdates: [],
  };
}
