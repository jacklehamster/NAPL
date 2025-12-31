import { Data } from "../types/Data";
import { Update } from "../types/Update";

export interface Context<T = Data> {
  userId?: string;
  root: T;
  incomingUpdates: Update[];
  outgoingUpdates: Update[];
  properties: { [key: string]: any };
  setData?(path: string, value: any | ((value: any) => any)): void;
  pushData?(path: string, value: any | ((value: any) => any)): void;
  readonly now: number;
}

export function createContext(root: Data, properties: Record<string, any> = {}): Context {
  return {
    root,
    properties,
    incomingUpdates: [],
    outgoingUpdates: [],
    now: 0,
  };
}
