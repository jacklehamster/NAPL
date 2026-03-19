import { Data } from "../../common/Data";

export interface Update {
  path: string;
  value?: Data;
  confirmed: number;
  peer?: string;
}
