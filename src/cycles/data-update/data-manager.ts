import { Update } from "../../types/Update";
import { getLeafObject, markUpdateConfirmed } from "./data-update";
import { Data } from "../../types/Data";
import { UpdateOptions } from "./UpdateOptions";
import { SetDataOptions } from "./SetDataOptions";

export function getData(root: Data, path: string = "", properties: { [key: string]: any }) {
  const parts = path.split("/");
  return getLeafObject(root, parts, 0, false, properties) as any;
}

export function pushData(root: Data, now: number, outgoingUpdates: Update[], path: string, value: any, options: UpdateOptions = {}) {
  processDataUpdate(root, now, outgoingUpdates, {
    path,
    value,
    append: true,
  }, options);
}

export function setData(root: Data, now: number, outgoingUpdates: Update[], path: string, value: any, options: SetDataOptions = {}) {
  processDataUpdate(root, now, outgoingUpdates, {
    path,
    value,
    append: options.append,
    insert: options.insert,
  }, options);
}

function processDataUpdate(root: Data, now: number, outgoingUpdates: Update[], update: Update, options: UpdateOptions = {}) {
  update.peer = options.peer;
  if (options.active ?? root.config?.activeUpdates) {
    markUpdateConfirmed(update, now);
  }
  outgoingUpdates.push(update);
}
