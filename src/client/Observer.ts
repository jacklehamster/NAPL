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
  constructor(
    readonly socketClient: SocketClient,
    paths: Update["path"][],
    readonly callback: (...values: any[]) => void
  ) {
    this.pathArrays = paths.map(p => p === undefined ? [] : Array.isArray(p) ? p : p.split("/"));
    this.observations = paths.map(() => {
      const observation = {
        previous: undefined,
        value: undefined,
      };
      return observation;
    });
  }

  triggerCallbackIfChanged() {
    const newValues = this.pathArrays.map(p => {
      return getLeafObject(this.socketClient.state, p, 0, false, this.socketClient.selfData.id);
    });
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
      return;
    }
    this.observations.forEach((observation, index) => {
      observation.previous = observation.value;
      observation.value = newValues[index];
    });
    this.callback(...this.observations);
  }

  close(): void {
    this.socketClient.removeObserver(this);
  }
}
