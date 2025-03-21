import { Update } from "./Update";

export interface Payload {
  myClientId?: string;
  state?: Record<string, any>;
  updates?: Update[];
  globalTime?: number;
  secret?: string;
}
