export function updateObject(obj) {
  const updates = obj.updates;
  updates?.sort((a, b) => a.timestamp - b.timestamp);
  obj.updates?.forEach(({ path, value }) => performUpdate(obj, path, value));
  obj.updates = [];
  return obj;
}

function performUpdate(obj, path, value) {
  const parts = Array.isArray(path) ? path : path.split("/");
  let current = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    current = current[parts[i]];
  }
  current[parts[parts.length - 1]] = value;
}
