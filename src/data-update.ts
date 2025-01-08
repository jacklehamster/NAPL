import { DataObject } from "./types/DataObject";
import { Update } from "./types/Update";

export function commitUpdates(obj: DataObject, updates: Update[], pathsUpdated?: Set<(string | number)[]>) {
  const now = Date.now();
  const confirmedUpdates = updates?.filter(update => update.confirmed);
  confirmedUpdates?.sort((a, b) => {
    const confirmedA = a.confirmed ?? now;
    const confirmedB = b.confirmed ?? now;
    if (confirmedA !== confirmedB) {
      return confirmedA - confirmedB;
    }
    const pathA = Array.isArray(a.path) ? a.path.join("/") : a.path;
    const pathB = Array.isArray(b.path) ? b.path.join("/") : b.path;
    return pathA.localeCompare(pathB);
  });
  confirmedUpdates?.forEach((update) => {
    const { path, value, deleted } = update;
    const parts = Array.isArray(path) ? path : path.split("/");
    if (pathsUpdated) {
      pathsUpdated.add(parts);
    }
    const leaf: any = getLeafObject(obj, parts, 1, true)!;
    const prop = parts[parts.length - 1];
    if (deleted) {
      delete leaf[prop];
    } else if (value !== undefined) {
      leaf[prop] = value;
    }
  });
}

export function getLeafObject(obj: DataObject, parts: (string | number)[], offset: number, autoCreate: boolean, selfId?: string) {
  let current = obj;
  for (let i = 0; i < parts.length - offset; i++) {
    const prop = selfId && parts[i] === "{self}" ? selfId : parts[i];
    if (prop === "{keys}") {
      return Object.keys(current);
    }
    if (current[prop] === undefined) {
      if (autoCreate) {
        current[prop] = {};
      } else {
        return undefined;
      }
    }
    current = current[prop];
  }
  return current;
}
