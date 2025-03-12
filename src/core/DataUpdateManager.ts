import { commitUpdates } from "@/data/data-update";
import { Data } from "@/types/Data";
import { Update } from "@/types/Update";
import Pool from "dok-pool";
import { Cycle } from "./Cycle";

interface DataUpdate {
  data?: Data;
  updates: Update[];
}

export class DataUpdateManager implements Cycle {
  readonly dataUpdates: Map<Data, DataUpdate> = new Map();
  readonly dataUpdatePool = new Pool<DataUpdate>(() => ({ updates: [] }), (data) => {
    data.data = undefined;
    data.updates.length = 0;
  });

  addUpdate(data: Data, update: Update) {
    let dataUpdate = this.dataUpdates.get(data);
    if (!dataUpdate) {
      dataUpdate = this.dataUpdatePool.get();
      dataUpdate.data = data;
      this.dataUpdates.set(data, dataUpdate);
    }
    dataUpdate.updates.push(update);
  }

  #commitUpdates() {
    this.dataUpdates.forEach((dataUpdate) => {
      commitUpdates(dataUpdate.data, {});
      this.dataUpdatePool.recycle(dataUpdate);
    });
    this.dataUpdates.clear();
  }

  performCycle() {
    this.#commitUpdates();
  }
}
