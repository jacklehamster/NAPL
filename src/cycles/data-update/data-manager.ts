import { Update } from "@/types/Update";
import { getLeafObject, markUpdateConfirmed } from "./data-update";
import { Context } from "@/cycle/context/Context";

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

export function pushData(context: Context, path: string, value: any, options: UpdateOptions = {}) {
  processDataUpdate(context, {
    path,
    value,
    append: true,
  }, options);
}

export function setData(context: Context, path: string, value: any, options: SetDataOptions = {}) {
  processDataUpdate(context, {
    path,
    value,
    append: options.append,
    insert: options.insert,
  }, options);
}

function processDataUpdate(context: Context, update: Update, options: UpdateOptions = {}) {
  if (options.active ?? context.root.config?.activeUpdates) {
    markUpdateConfirmed(update, (context.localTimeOffset ?? 0) + Date.now());
  }
  context.outgoingUpdates.push(update);
}
