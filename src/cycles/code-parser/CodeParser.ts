import { Data } from "@/types/Data";
import { DataBinder } from "@/cycles/data-binding/DataBinder";
import { Cycle } from "@/cycle/Cycle";
import { Context } from "@/cycle/context/Context";

const CODE_REGEX = /^~\{([^}]+)\}$/;

export class CodeParser implements Cycle {
  performCycle(cycleData: Context): void {
    this.#parse([], cycleData.root, cycleData, undefined);
  }

  #parse(parts: (string | number)[], obj: Data | any, cycleData: Context, parent?: Data | any[]) {
    const entry = cycleData.registry?.shouldRegister(obj) ? cycleData.registry?.register(parts.join("/"), parent) : undefined;
    if (typeof (obj) === "string") {
      const code = getCode(obj);
      if (code && entry) {
        entry.dataBinder = new DataBinder(code, entry, cycleData.observers);
      }
      return;
    }
    if (typeof (obj) !== "object") {
      return;
    }
    if (Array.isArray(obj)) {
      obj.forEach((item, index) => {
        parts.push(index);
        this.#parse(parts, item, cycleData, obj);
        parts.pop();
      });
    }
    Object.entries(obj).forEach(([key, value]) => {
      parts.push(key);
      this.#parse(parts, value, cycleData, obj);
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
