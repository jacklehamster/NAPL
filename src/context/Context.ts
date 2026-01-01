import { Data } from "../types/Data";
import { Update } from "../types/Update";

export interface Context<T = Data> {
  userId: string;
  root: Record<string, T>;
  updateTimestamp: Record<string, number>;
  incomingUpdates: Update[];
  outgoingUpdates: Update[];
  properties: { [key: string]: any };
  setData?(path: string, value: any | ((value: any) => any)): void;
  pushData?(path: string, value: any | ((value: any) => any)): void;
  onIncomingUpdates?(update: Update[]): void;
  readonly now: number;
}
