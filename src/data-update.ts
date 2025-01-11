import { DataObject } from "./types/DataObject";
import { Update } from "./types/Update";

export function commitUpdates(obj: DataObject, updates: Update[], pathsUpdated?: Set<(string | number)[]>) {
  const confirmedUpdates = getConfirmedUpdates(updates);
  confirmedUpdates?.forEach((update) => {
    const { path, value, deleted, push, insert } = update;
    const parts = Array.isArray(path) ? path : path.split("/");
    if (pathsUpdated) {
      pathsUpdated.add(parts);
    }
    const leaf: any = getLeafObject(obj, parts, 1, true)!;
    const prop = parts[parts.length - 1];
    if (deleted) {
      delete leaf[prop];
    } else if (value !== undefined) {
      if (push) {
        if (!Array.isArray(leaf[prop])) {
          leaf[prop] = [];
        }
        leaf[prop] = [...leaf[prop], value];
      } else if (insert !== undefined) {
        if (!Array.isArray(leaf[prop])) {
          leaf[prop] = [];
        }
        leaf[prop] = [...leaf[prop].slice(0, insert), value, ...leaf[prop].slice(insert)];
      } else {
        leaf[prop] = value;
      }
    }
  });
}

function getConfirmedUpdates(updates: Update[]) {
  const confirmedUpdates = updates.filter(update => update.confirmed);
  confirmedUpdates?.sort((a, b) => {
    const confirmedA = a.confirmed ?? 0;
    const confirmedB = b.confirmed ?? 0;
    if (confirmedA !== confirmedB) {
      return confirmedA - confirmedB;
    }
    const pathA = Array.isArray(a.path) ? a.path.join("/") : a.path;
    const pathB = Array.isArray(b.path) ? b.path.join("/") : b.path;
    return pathA.localeCompare(pathB);
  });
  return confirmedUpdates;
}

export function getLeafObject(obj: DataObject, parts: (string | number)[], offset: number, autoCreate: boolean, selfId?: string) {
  let current = obj;
  for (let i = 0; i < parts.length - offset; i++) {
    let prop = selfId && parts[i] === "{self}" ? selfId : parts[i];
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
