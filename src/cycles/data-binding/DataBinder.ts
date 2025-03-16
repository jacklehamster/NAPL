import { Observer } from "@/cycle/data/observer/Observer";
import { RegistryEntry } from "@/cycle/data/registry/RegistryEntry";

export class DataBinder {
  constructor(readonly code: string, readonly registryEntry: RegistryEntry, observers: Record<string, Observer[]>) {
    const fullPath = code.startsWith("/") ? code.substring(1) : `${registryEntry.path}/${code}`;
    observers[fullPath] = observers[fullPath] ?? [];
    observers[fullPath].push({ registry: registryEntry });
    registryEntry.dataBinder = this;
  }

  update(value: any) {
    const prop = this.registryEntry.path.split("/").pop();
    if (prop !== undefined) {
      if (Array.isArray(this.registryEntry.parent)) {
        this.registryEntry.parent[parseInt(prop)] = value;
      } else {
        this.registryEntry.parent[prop] = value;
      }
    }
  }
}
