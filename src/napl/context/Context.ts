import { Data } from "../../common/Data";
import { Update } from "../types/Update";

export interface Context<T = Data> {
  userId: string;
  root: Record<string, T>;
  incomingUpdates: Update[];
  outgoingUpdates: Update[];
  properties: { [key: string]: any };
  setData?(path: string, value: Data): void;
  onReceivedIncomingUpdates?(): void;
}
