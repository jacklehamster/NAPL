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
    const entry = registry?.register(parts.join("/"), parent);
    if (typeof (obj) === "string") {
      if (obj.startsWith("~{") && obj.endsWith("}") && parent && entry) {
        const group = obj.match(CODE_REGEX);  // ~{...}
        if (group) {
          entry.dataBinder = new DataBinder(group[1], root, [...parts]);
        }
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
