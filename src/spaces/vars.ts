import { remapObject } from "@/utils/obj-utils";
import { deploy, Val } from "../core/Space";

function Vars<T extends Record<string, Val<any>>>(props: T) {
  const result = remapObject(props, (val, key) => [
    key,
    val.space ? val : val.val,
  ]);
  return result;
}

export function vars<T extends Record<string, any>>(props: T) {
  const { result } = deploy(Vars, props);
  return result;
}
