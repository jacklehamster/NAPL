export function remapObject<T, R>(
  obj: { [key: string]: T },
  callback: (value: T, key: string) => R | undefined,
) {
  return Object.fromEntries(
    Object.entries(obj ?? {})
      .map(([key, value]) => callback(value, key))
      .filter((a) => Array.isArray(a)),
  );
}
