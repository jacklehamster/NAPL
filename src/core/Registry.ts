import { Data } from "@/types/Data";
import { RegistryEntry } from "./RegistryEntry";

export class Registry {
  readonly #record: Record<string, RegistryEntry> = {};
  readonly #mapRecord: Map<Data, RegistryEntry> = new Map();

  registryKeys() {
    return Object.keys(this.#record);
  }

  register(path: string, obj: any, parent: any) {
    const entry: RegistryEntry = this.#record[path] = {
      parent,
      path,
      prop: path.split("/").pop() as string,
    };
    this.#mapRecord.set(obj, this.#record[path]);
    return entry;
  }

  getRecord(path: string) {
    return this.#record[path];
  }

  recordFromObject(obj: Data) {
    return this.#mapRecord.get(obj);
  }
}
