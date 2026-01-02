import { Update } from "../../types/Update";
import { Data } from "../../types/Data";
import { Context } from "@/context/Context";

const NO_OBJ = {};

// This function is used to commit updates to the root object
export function commitUpdates({root, incomingUpdates, outgoingUpdates, properties}: Context, consolidate?: boolean) {
  if (consolidate) {
    consolidateUpdates(incomingUpdates, outgoingUpdates);
  }
  if (!incomingUpdates.length) {
    return undefined;
  }
  const updatedPaths: Record<string, any> = {};
  incomingUpdates.forEach((update) => {
    if (!update.confirmed) {
      return;
    }

    const parts = update.path.split("/");
    const leaf: any = getLeafObject(root, parts, 1, true, properties, updatedPaths);
    const prop = parts[parts.length - 1];
    const value = translateValue(update.value, properties);
    if (value === undefined) {
      delete leaf[prop];
      updatedPaths[parts.slice(0, parts.length-1).join("/")] = undefined;
      cleanupRoot(root, parts, 0, updatedPaths);
    } else {
      leaf[prop] = value;
    }
    updatedPaths[update.path] = leaf[prop];
  });
  let size = 0;
  for (let i = 0; i < incomingUpdates.length; i++) {
    incomingUpdates[size] = incomingUpdates[i];
    if (!incomingUpdates[i].confirmed) {
      size++;
    }
  }
  incomingUpdates.length = size;
  return updatedPaths;
}

// This function is used to remove empty objects from the root object
function cleanupRoot(root: any, parts: (string | number)[], index: number, updatedPaths: Record<string, any>) {
  if (!root || typeof (root) !== "object" || Array.isArray(root)) {
    return false;
  }
  if (cleanupRoot(root[parts[index]], parts, index + 1, updatedPaths)) {
    delete root[parts[index]];
    updatedPaths[parts.slice(0, index - 1).join("/")] = undefined;
  }
  return Object.keys(root).length === 0;
}

function compareUpdates(a: Update, b: Update) {
    if (a.confirmed !== b.confirmed) {
      return a.confirmed - b.confirmed;
    }
    return a.path.localeCompare(b.path);
}

const _map: Map<string, Update> = new Map();
export function consolidateUpdates(incoming: Update[], outgoing: Update[]) {
  if (!incoming.length && !outgoing.length) {
    return;
  }
  //  Find actual confirmed updates
  _map.clear();
  for (let i = 0; i < incoming.length; i++) {
    const update = incoming[i];
    if (update.confirmed) {
      const existingUpdate = _map.get(update.path);
      if (!existingUpdate || compareUpdates(existingUpdate, update) < 0) {
        _map.set(update.path, update);
      }
    }
  }
  for (let i = 0; i < outgoing.length; i++) {
    const update = outgoing[i];
    if (update.confirmed) {
      const existingUpdate = _map.get(update.path);
      if (!existingUpdate || compareUpdates(existingUpdate, update) < 0) {
        _map.set(update.path, update);
      }
    }
  }
  //  remove redundant updates
  let size = 0;
  for (let i = 0; i < incoming.length; i++) {
    incoming[size] = incoming[i];
    if (!incoming[i].confirmed || _map.get(incoming[i].path) === incoming[i]) {
      size++;
    }
  }
  incoming.length = size;
  size = 0;
  for (let i = 0; i < outgoing.length; i++) {
    outgoing[size] = outgoing[i];
    if (!outgoing[i].confirmed || _map.get(outgoing[i].path) === outgoing[i]) {
      size++;
    }
  }
  outgoing.length = size;
  _map.clear();
}

//  Dig into the object to get the leaf object, given the parts of the path
export function getLeafObject(obj: Data, parts: (string | number)[], offset: number, autoCreate: boolean, properties: Record<string, any>, updatedPaths?: Record<string, any>): Data {
  let current = obj;
  const pathParts: string[] = [];
  for (let i = 0; i < parts.length - offset; i++) {
    const prop = parts[i];
    const value = translateProp(current, prop, properties, autoCreate, updatedPaths, parts.slice(0, i).join("/"));
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
        const group = value.match(/~\{([^}]+)\}/);
        if (group) {
          return properties[group[1]];
        }
    }
  }
  return value;
}

export function translateProp(obj: any, prop: string | number, properties: Record<string, any>, autoCreate: boolean = false, updatePaths?: Record<string, any>, path?: string) {
  let value;
  if (typeof prop !== "string") {
    value = obj[prop];
  } else if (prop.startsWith("~{") && prop.endsWith("}")) {
    switch (prop) {
      case '~{keys}':
        return Object.keys(obj ?? NO_OBJ);
      case '~{values}':
        return Object.values(obj ?? NO_OBJ);
      default:
        return obj[translateValue(prop, properties)];
    }
  } else {
    value = obj[prop];
  }
  if (value === undefined && autoCreate) {
    value = obj[prop] = {};
    if (updatePaths && path) {
      updatePaths[path] = value;
    }
  }
  return value;
}
