import { Update } from "../../types/Update";
import { Data } from "../../types/Data";

const KEYS = "~{keys}";
const VALUES = "~{values}";
const REGEX = /~\{([^}]+)\}/;

// This function is used to commit updates to the root object
export function commitUpdates(
  root: Data,
  updates: Update[],
  properties: Record<string, any>,
  updatedPaths: Record<string, any> = {}) {

  if (!updates.length) {
    return updatedPaths;
  }
  sortUpdates(updates);
  updates.forEach((update) => {
    if (!update.confirmed) {
      return;
    }

    const parts = update.path.split("/");
    const leaf: any = getLeafObject(root, parts, 1, true);
    const prop = parts[parts.length - 1];
    const value = translateValue(update.value, properties);
    if (update.append) {
      if (!Array.isArray(leaf[prop])) {
        leaf[prop] = [];
      }
      leaf[prop] = [...leaf[prop], value];
    } else if ((update.insert ?? -1) >= 0) {
      if (!Array.isArray(leaf[prop])) {
        leaf[prop] = [];
      }
      leaf[prop] = [...leaf[prop].slice(0, (update.insert ?? -1)), value, ...leaf[prop].slice(update.insert)];
    } else if ((update.delete ?? -1) >= 0) {
      if (Array.isArray(leaf[prop])) {
        leaf[prop] = [...leaf[prop].slice(0, update.delete), ...leaf[prop].slice((update.delete ?? -1) + 1)];
      }
    } else if (value === undefined) {
      delete leaf[prop];
      cleanupRoot(root, parts, 0);
    } else {
      leaf[prop] = value;
    }
    updatedPaths[update.path] = leaf[prop];
  });
  let size = 0;
  for (let i = 0; i < updates.length; i++) {
    updates[size] = updates[i];
    if (updates[i].path in updatedPaths) {
      size++;
    }
  }
  updates.length = size;
  return updatedPaths;
}

// This function is used to remove empty objects from the root object
function cleanupRoot(root: Record<string, any>, parts: (string | number)[], index: number) {
  if (!root || typeof (root) !== "object" || Array.isArray(root)) {
    return false;
  }
  if (cleanupRoot(root[parts[index]], parts, index + 1)) {
    delete root[parts[index]];
  }
  return Object.keys(root).length === 0;
}

function sortUpdates(updates: Update[]) {
  updates.sort((a, b) => {
    const confirmedA = a.confirmed ?? 0;
    const confirmedB = b.confirmed ?? 0;
    if (confirmedA !== confirmedB) {
      return confirmedA - confirmedB;
    }
    return a.path.localeCompare(b.path);
  });
}

//  Dig into the object to get the leaf object, given the parts of the path
export function getLeafObject(obj: Record<string, any>, parts: (string | number)[], offset: number, autoCreate: boolean, properties: Record<string, any> = {}) {
  let current = obj;
  for (let i = 0; i < parts.length - offset; i++) {
    const prop = parts[i];
    const value = translateProp(current, prop, properties, autoCreate);
    if (value === undefined) {
      return value;
    }
    current = value;
  }
  return current;
}

export function translateValue(value: any, properties: Record<string, any>) {
  if (typeof value !== "string") {
    return value;
  }
  if (value.startsWith("~{") && value.endsWith("}")) {
    switch (value) {
      default:
        const group = value.match(REGEX);
        if (group) {
          return properties[group[1]];
        }
    }
  }
  return value;
}

function translateProp(obj: any, prop: string | number, properties: Record<string, any>, autoCreate: boolean) {
  let value;
  if (typeof prop !== "string") {
    value = obj[prop];
  } else if (prop.startsWith("~{") && prop.endsWith("}")) {
    switch (prop) {
      case KEYS:
        return Object.keys(obj ?? {});
      case VALUES:
        return Object.values(obj ?? {});
      default:
        return obj[translateValue(prop, properties)];
    }
  } else {
    value = obj[prop];
  }
  if (value === undefined && autoCreate) {
    value = obj[prop] = {};
  }
  return value;
}

//  Mark the update as confirmed
export function markUpdateConfirmed(update: Update, now: number) {
  if (!update.confirmed) {
    update.confirmed = now;
  }
}
