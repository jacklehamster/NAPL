import { Update } from "../../types/Update";
import { getLeafObject } from "./data-update";
import { Data } from "../../types/Data";
import { UpdateOptions } from "./UpdateOptions";

const NO_OBJ = {};

export function getData(root: Data, path: string, properties: { [key: string]: any }) {
  const parts = path.split("/");
  return getLeafObject(root, parts, 0, false, properties);
}

export function setData(now: number, outgoingUpdates: Update[], path: string, value: any, options: UpdateOptions = NO_OBJ) {
  const update: Update = { path, value, confirmed: 0 };
  if (options.peer) update.peer = options.peer;
  if (options.active) {
    update.confirmed = now;
  }
  outgoingUpdates.push(update);
}
