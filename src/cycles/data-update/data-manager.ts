import { Update } from "@/types/Update";
import { getLeafObject, markUpdateConfirmed } from "./data-update";
import { Context } from "@/cycle/context/Context";
import { Data } from "@/types/Data";

export interface UpdateOptions {
  active?: boolean;
}

export interface SetDataOptions extends UpdateOptions {
  append?: boolean;
  insert?: number;
}

export function getData(context: Context, path: string = "") {
  const parts = path.split("/");
  return getLeafObject(context.root, parts, 0, false, context.properties) as any;
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
  if (options.active ?? root.config?.activeUpdates) {
    markUpdateConfirmed(update, now);
  }
  outgoingUpdates.push(update);
}
