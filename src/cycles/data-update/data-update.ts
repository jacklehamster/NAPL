import { Update } from "../../types/Update";
import { Data } from "../../types/Data";
import { Context } from "@/context/Context";

export function filterArray<T>(array: T[], cond:(v:T) => boolean) {
  let size = 0;
  for (let i = 0; i < array.length; i++) {
    array[size] = array[i];
    if (cond(array[i])) {
      size++;
    }
  }
  array.length = size;
}

// This function is used to commit updates to the root object
export function commitUpdates({root, incomingUpdates, outgoingUpdates, properties}: Context, updatedPaths: Map<string, any>, consolidate?: boolean) {
  if (consolidate) {
    consolidateUpdates(incomingUpdates, outgoingUpdates);
  }
  if (!incomingUpdates.length) {
    return;
  }
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
      updatedPaths.set(parts.slice(0, parts.length).join("/"), undefined);
      updatedPaths.set(parts.slice(0, parts.length - 1).join("/"), leaf);
      cleanupRoot(root, parts, 0, updatedPaths);
    } else {
      if (typeof(leaf[prop]) === undefined) {
        updatedPaths.set(parts.slice(0, parts.length).join("/"), leaf);
      }
      leaf[prop] = value;
    }
    updatedPaths.set(update.path, leaf[prop]);

  });
  filterArray(incomingUpdates, update => !update.confirmed);
}

// This function is used to remove empty objects from the root object
export function cleanupRoot(root: any, parts: (string | number)[], index: number, updatedPaths: Map<string, any>) {
  if (!root || typeof (root) !== "object" || Array.isArray(root)) {
    return false;
  }
  if (cleanupRoot(root[parts[index]], parts, index + 1, updatedPaths)) {
    delete root[parts[index]];
    const leafPath = parts.slice(0, index + 1);
    updatedPaths.set(leafPath.join("/"), undefined);
    leafPath.pop();
    updatedPaths.set(leafPath.join("/"), root);  //  parent affected
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
  filterArray(incoming, update => !update.confirmed || _map.get(update.path) === update);
  filterArray(outgoing, update => !update.confirmed || _map.get(update.path) === update);
  _map.clear();
}

//  Dig into the object to get the leaf object, given the parts of the path
export function getLeafObject(obj: Data, parts: (string | number)[], offset: number, autoCreate: boolean, properties: Record<string, any>, updatedPaths?: Map<string, any>): Data {
  let current = obj;
  const pathParts: string[] = [];
  for (let i = 0; i < parts.length - offset; i++) {
    const prop = parts[i];
    const value = translateProp(current, prop, properties, autoCreate, updatedPaths, parts.slice(0, i + 1).join("/"));
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

export function translateProp(obj: any, prop: string | number, properties: Record<string, any>, autoCreate: boolean = false, updatedPaths?: Map<string, any>, path?: string) {
  const theProp = translateValue(prop, properties);
  let value = obj[theProp];
  if (value === undefined && autoCreate) {
    value = obj[theProp] = {};
    if (updatedPaths && path) {
      updatedPaths.set(path, value);
    }
  }
  return value;
}
