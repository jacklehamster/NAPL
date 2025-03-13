import { Data } from "@/types/Data";
import { DataBinder } from "@/cycles/data-binding/DataBinder";
import { Cycle } from "@/cycle/Cycle";
import { CycleData } from "@/cycle/CycleData";
import { Registry } from "./Registry";

const CODE_REGEX = /^~\{([^}]+)\}$/;

export class CodeParser implements Cycle {
  constructor(readonly registry: Registry) {
  }

  performCycle(cycleData: CycleData): void {
    this.parse([], cycleData.root);
  }

  parse(parts: (string | number)[], obj: Data | any, parent?: Data | any[]) {
    if (this.registry.recordFromObject(obj)) {
      return;
    }
    const entry = this.registry.register(parts.join("/"), obj, parent);
    if (typeof (obj) === "string") {
      if (obj.startsWith("~{") && obj.endsWith("}") && parent) {
        const group = obj.match(CODE_REGEX);  // ~{...}
        if (group) {
          entry.dataBinder = new DataBinder(group[1], obj, parts);
        }
      }
      return;
    }
    if (typeof (obj) !== "object") {
      return;
    }
    this.registry.register(parts.join("/"), obj, parent);
    if (Array.isArray(obj)) {
      obj.forEach((item, index) => {
        parts.push(index);
        this.parse(parts, item, obj);
        parts.pop();
      });
    }
    Object.entries(obj).forEach(([key, value]) => {
      parts.push(key);
      this.parse(parts, value, obj);
      parts.pop();
    });
  }
}
