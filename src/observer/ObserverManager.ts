import { Context } from "../cycle/context/Context";
import { Observer } from "./Observer";

export class ObserverManager {
  readonly #observers = new Set<Observer>();

  observe(paths: string[], multi: boolean): Observer {
    const observer = new Observer(paths, this, multi);
    this.#observers.add(observer);
    return observer;
  }

  triggerObservers(context: Context, updates: Record<string, any>) {
    this.#observers.forEach(o => o.triggerIfChanged(context, updates));
  }

  removeObserver(observer: Observer) {
    this.#observers.delete(observer);
  }

  close() {
    this.#observers.forEach(o => o.close());
  }
}
