import { Data } from "@/types/Data";
import { DataBinder } from "@/cycles/data-binding/DataBinder";
import { Cycle } from "@/cycle/Cycle";
import { CycleData } from "@/cycle/CycleData";
import { Registry } from "./Registry";

const CODE_REGEX = /^~\{([^}]+)\}$/;

export class CodeParser implements Cycle {
  constructor() {
  }

  performCycle(cycleData: CycleData): void {
    this.#parse([], cycleData.root, undefined, cycleData.registry, cycleData.root);
  }

  #parse(parts: (string | number)[], obj: Data | any, parent?: Data | any[], registry?: Registry, root?: Data) {
    const entry = registry?.shouldRegister(obj) ? registry?.register(parts.join("/"), parent) : undefined;
    if (typeof (obj) === "string") {
      const code = getCode(obj);
      if (code && entry) {
        entry.dataBinder = new DataBinder(code, root, [...parts]);
      }
      return;
    }
    if (typeof (obj) !== "object") {
      return;
    }
    if (Array.isArray(obj)) {
      obj.forEach((item, index) => {
        parts.push(index);
        this.#parse(parts, item, obj, registry, root);
        parts.pop();
      });
    }
    Object.entries(obj).forEach(([key, value]) => {
      parts.push(key);
      this.#parse(parts, value, obj, registry, root);
      parts.pop();
    });
  }
}

export function isCode(str: string | any) {
  if (typeof (str) === "string") {
    return getCode(str) !== undefined;
  }
  return false;
}


function getCode(str: string) {
  if (str.startsWith("~{") && str.endsWith("}")) {
    const group = str.match(CODE_REGEX);  // ~{...}
    if (group) {
      return group[1];
    }
  }
  return undefined;
}
