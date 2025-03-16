import { Context } from "@/cycle/context/Context";
import { Cycle } from "../../cycle/Cycle";

export class DataBindingManager implements Cycle {
  performCycle(cyleData: Context) {
    Object.entries(cyleData.updatedPaths).forEach(([path, value]) => {
      const observers = cyleData.observers[path];
      if (observers) {
        observers.forEach((observer) => {
          observer.registry.dataBinder?.update(value);
        });
      }
    });
  }
}
