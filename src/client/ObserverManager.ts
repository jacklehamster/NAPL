import { Update } from "@/types/Update";
import { Observer } from "./Observer";
import { SocketClient } from "./SocketClient";
import { IObservable } from "./IObservable";

export class ObserverManager implements IObservable {
  readonly #observers: Set<Observer> = new Set();

  constructor(private socketClient: SocketClient) {
  }

  observe(...paths: Update["path"][]): Observer {
    const observer = new Observer(this.socketClient, paths);
    this.#observers.add(observer);
    return observer;
  }

  triggerObservers() {
    this.#observers.forEach(o => o.triggerIfChanged());
  }

  removeObserver(observer: Observer) {
    this.#observers.delete(observer);
  }
}
