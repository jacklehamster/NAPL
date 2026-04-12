import { Props, Space, Val, Vals } from "../core/Space";
import { remapObject } from "./obj-utils";

export function makeVar<T>(
  initVal: T,
  space: Space | null,
  id: string,
): Val<T> {
  let value: T = initVal;
  const val: Val<T> = {
    id,
    space,
    get val() {
      return value;
    },
    set val(newValue: T) {
      const oldVal = value;
      value = newValue;
      val.listeners.forEach((listener) => listener(val, oldVal));
    },
    listeners: [],
  };
  return val;
}

export function bindVar<D extends Props, T>(
  val: Val<T>,
  deps: D,
  callback: (deps: D, val: Val<T>) => void,
) {
  Object.values(deps).forEach((v) => {
    if (typeof v === "object" && v) {
      v.listeners.push(() => callback(deps, val));
    }
  });

  callback(deps, val);
  return val;
}

export function linkVar<T>(val1: Val<T>, val2: Val<T>) {
  val1.listeners.push(() => {
    val2.val = val1.val;
  });
  val2.listeners.push(() => {
    val1.val = val2.val;
  });
}

export function makeResults(props: Props, space: Space | null): Vals {
  return remapObject(props, (value, key) =>
    key === "id"
      ? undefined
      : [
          key,
          value !== null && typeof value === "object"
            ? value
            : makeVar(value, space, key),
        ],
  );
}
