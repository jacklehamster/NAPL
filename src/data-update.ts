import { DataObject } from "./types/DataObject";
import { Update } from "./types/Update";

export function commitUpdates(obj: DataObject, updates: Update[], pathsUpdated?: Set<string>) {
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
    if (pathsUpdated) {
      pathsUpdated.add(Array.isArray(path) ? path.join("/") : path);
    }
    const parts = Array.isArray(path) ? path : path.split("/");
    const leaf = getLeafObject(obj, parts);
    const prop = parts[parts.length - 1];
    if (deleted) {
      delete leaf[prop];
    } else if (value !== undefined) {
      leaf[prop] = value;
    }
  });
  return { remainingUpdates: updates?.filter(update => !update.confirmed) };
}

function getLeafObject(obj: DataObject, parts: (string | number)[]) {
  let current = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    current = current[parts[i]] ?? (current[parts[i]] = {});
  }
  return current;
}
