import { Context } from "@/context/Context";
import { Observer } from "./Observer";

export class ObserverManager {
  private readonly observers = new Map<string, Set<Observer>>();

  private ensurePath(path: string): Set<Observer> {
    if (path.endsWith("~{keys}") || path.endsWith("~{values}")) {
      const parts = path.split("/");
      path = parts.slice(0, parts.length - 1).join('/');
    }

    const obsSet = this.observers.get(path);
    if (obsSet) {
      return obsSet;
    }
    const observerSet = new Set<Observer>()
    this.observers.set(path, observerSet);
    return observerSet;
  }

  observe(paths: string[], multi: boolean): Observer {
    const observer = new Observer(paths, this, multi);
    paths.forEach(path => {
      const obsSet = this.ensurePath(path);
      obsSet.add(observer);
    });
    return observer;
  }

  readonly #tempObsTriggered = new Set<Observer>();
  triggerObservers(context: Context, updates: Record<string, any>) {
    for (const path in updates) {
      this.observers.get(path)?.forEach(observer => this.#tempObsTriggered.add(observer));
    }
    this.#tempObsTriggered.forEach(o => o.triggerIfChanged(context, updates));
    this.#tempObsTriggered.clear();
  }

  removeObserver(observer: Observer) {
    observer.paths.forEach(path => {
      const obsSet = this.observers.get(path);
      obsSet?.delete(observer);
      if (!obsSet?.size) {
        this.observers.delete(path);
      }
    });
  }

  close() {
    this.observers.forEach(obsSet => obsSet.forEach(o => o.close()));
    this.observers.clear();
  }
}
