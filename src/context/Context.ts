import { Data } from "../types/Data";
import { Update } from "../types/Update";

export interface Context<T = Data> {
  userId: string;
  root: Record<string, T>;
  incomingUpdates: Update[];
  outgoingUpdates: Update[];
  properties: { [key: string]: any };
  setData?(path: string, value: any | ((value: any) => any)): void;
  onIncomingUpdatesReceived?(updates: Update[]): void;
}
