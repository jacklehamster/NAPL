import { getLeafObject } from "@/data-update";
import { Update } from "@/types/Update";
import { SocketClient } from "./SocketClient";

interface Observation {
  previous: any;
  value: any;
}

export class Observer {
  readonly pathArrays: (string | number)[][];
  readonly observations: Observation[];
  changeCallbacks: Set<(...values: any[]) => void> = new Set();
  #addedElementsCallback?: (...keys: (any[] | undefined)[]) => void;
  #deletedElementsCallback?: (...keys: (any[] | undefined)[]) => void;
  constructor(
    readonly socketClient: SocketClient,
    paths: Update["path"][]) {
    this.pathArrays = paths.map(p => p === undefined ? [] : p.split("/"));
    this.observations = paths.map(() => {
      const observation = {
        previous: undefined,
        value: undefined,
      };
      return observation;
    });
    requestAnimationFrame(() => {
      this.triggerIfChanged();
    });
  }

  onChange(callback: (...values: Observation[]) => void): Observer {
    this.changeCallbacks.add(callback);
    return this;
  }

  onElementsAdded(callback: (...keys: (any[] | undefined)[]) => void): Observer {
    this.#addedElementsCallback = callback;
    return this;
  }

  onElementsDeleted(callback: (...keys: (any[] | undefined)[]) => void): Observer {
    this.#deletedElementsCallback = callback;
    return this;
  }

  #updatedObservations() {
    const newValues = this.pathArrays.map(p =>
      getLeafObject(this.socketClient.state, p, 0, false, this.socketClient.clientId)
    );
    if (this.observations.length && this.observations.every((ob, index) => {
      const newValue = newValues[index];
      if (ob.value === newValue) {
        return true;
      }
      if (Array.isArray(ob.value) && Array.isArray(newValue)
        && ob.value.length === newValue.length
        && ob.value.every((elem, idx) => elem === newValue[idx])) {
        return true;
      }
      return false;
    })) {
      return false;
    }
    this.observations.forEach((observation, index) => {
      observation.previous = observation.value;
      observation.value = newValues[index];
    });
    return true;
  }

  triggerIfChanged() {
    if (!this.#updatedObservations()) {
      return;
    }
    this.changeCallbacks.forEach(callback => callback(...this.observations));
    if (this.#addedElementsCallback && this.observations.some((observation) => Array.isArray(observation.value))) {
      let hasNewElements = false;
      const newElementsArray = this.observations.map((observation) => {
        if (Array.isArray(observation.value)) {
          const previousSet = new Set(Array.isArray(observation.previous) ? observation.previous : []);
          const newElements = observation.value.filter((clientId) => !previousSet.has(clientId));
          if (newElements.length) {
            hasNewElements = true;
          }
          return newElements;
        }
      });
      if (hasNewElements) {
        this.#addedElementsCallback(...newElementsArray);
      }
    }
    if (this.#deletedElementsCallback && this.observations.some((observation) => Array.isArray(observation.previous))) {
      let hasDeletedElements = false;
      const deletedElementsArray = this.observations.map((observation) => {
        if (Array.isArray(observation.previous)) {
          const currentSet = new Set(Array.isArray(observation.value) ? observation.value : []);
          const deletedElements = observation.previous.filter((clientId) => !currentSet.has(clientId));
          if (deletedElements.length) {
            hasDeletedElements = true;
          }
          return deletedElements;
        }
      });
      if (hasDeletedElements) {
        this.#deletedElementsCallback(...deletedElementsArray);
      }
    }
  }

  close(): void {
    console.log("Closed observer " + this.pathArrays.join("/"));
    this.socketClient.removeObserver(this);
  }
}
