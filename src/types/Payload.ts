import { Update } from "./Update";

export interface Payload {
  sender?: string;
  myClientId?: string;
  state?: Record<string, any>;
  updates?: Update[];
  globalTime?: number;
  secret?: string;
}
