import { Data } from "../types/Data";
import { Update } from "../types/Update";

export interface Context<T = Data> {
  clientId?: string;
  root: T;
  incomingUpdates: Update[];
  outgoingUpdates: Update[];
  properties: { [key: string]: any };
  refresh?(): void;
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
