import { RegistryEntry } from "./RegistryEntry";

export class Registry {
  readonly #record: Record<string, RegistryEntry> = {};

  registryKeys() {
    return Object.keys(this.#record);
  }

  register(path: string, parent: any) {
    const entry: RegistryEntry = this.#record[path] = {
      parent,
      path,
      prop: path.split("/").pop() as string,
    };
    return entry;
  }

  getRecord(path: string) {
    return this.#record[path];
  }
}
