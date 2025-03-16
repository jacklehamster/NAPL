import { Data } from "@/types/Data";
import { RegistryEntry } from "./RegistryEntry";
import { isCode } from "../../../cycles/code-parser/CodeParser";

export class Registry {
  readonly record: Record<string, RegistryEntry> = {};

  registryKeys() {
    return Object.keys(this.record);
  }

  register(path: string, parent: any): RegistryEntry {
    const entry: RegistryEntry = this.record[path] = {
      parent,
      path,
    };
    return entry;
  }

  shouldRegister(obj: Data | any) {
    if (isCode(obj) || obj?.type) {
      return true;
    }
    return false;
  }
}
