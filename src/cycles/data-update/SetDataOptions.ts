import { UpdateOptions } from "./UpdateOptions";


export interface SetDataOptions extends UpdateOptions {
  append?: boolean;
  insert?: number;
  peer?: string;
}
