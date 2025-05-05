import { Update } from "./Update";

export interface Payload {
  myClientId?: string;
  updates?: Update[];
}
