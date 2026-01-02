import { Data } from "./Data";

export interface Update {
  path: string;
  value?: Data;
  confirmed: number;
  peer?: string;
}
