import { Update } from "../../types/Update";
import { getLeafObject, markUpdateConfirmed } from "./data-update";
import { Data } from "../../types/Data";
import { UpdateOptions } from "./UpdateOptions";
import { SetDataOptions } from "./SetDataOptions";

const NO_OBJ = {};

export function getData(root: Data, path: string, properties: { [key: string]: any }) {
  const parts = path.split("/");
  return getLeafObject(root, parts, 0, false, properties) as any;
}

export function pushData(root: Data, now: number, outgoingUpdates: Update[], path: string, value: any, options: UpdateOptions = NO_OBJ) {
  const props: {path: string; value: any; append: true} = { path, value, append: true };
  return processDataUpdate(root, now, outgoingUpdates, props, options);
}

export function setData(root: Data, now: number, outgoingUpdates: Update[], path: string, value: any, options: SetDataOptions = NO_OBJ) {
  const props: {path: string; value: any; append?: boolean; insert?: number} = { path, value };
  if (options.append) props.append = options.append;
  if (options.insert) props.insert = options.insert;
  return processDataUpdate(root, now, outgoingUpdates, props, options);
}

function processDataUpdate(root: Data, now: number, outgoingUpdates: Update[], update: Update, options: UpdateOptions = NO_OBJ) {
  update.peer = options.peer;
  if (options.active) {
    markUpdateConfirmed(update, now);
  }
  outgoingUpdates.push(update);
  return update;
}
