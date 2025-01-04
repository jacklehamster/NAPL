import { DataObject } from "./types/DataObject";
import { Update } from "./types/Update";

export function commitUpdates(obj: DataObject, updates: Update[]) {
  const now = Date.now();
  const confirmedUpdates = updates?.filter(update => update.confirmed);
  confirmedUpdates?.sort((a, b) => (a.timestamp ?? now) - (b.timestamp ?? now));
  confirmedUpdates?.forEach((update) => {
    const { path, value, deleted } = update;
    const parts = Array.isArray(path) ? path : path.split("/");
    const leaf = getLeafObject(obj, parts);
    const prop = parts[parts.length - 1];
    if (deleted) {
      delete leaf[prop];
    } else if (value !== undefined) {
      leaf[prop] = value;
    }
  });
  return updates?.filter(update => !update.confirmed);
}

function getLeafObject(obj: DataObject, parts: (string | number)[]) {
  let current = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    current = current[parts[i]] ?? (current[parts[i]] = {});
  }
  return current;
}
