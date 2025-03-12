import { commitUpdates } from "@/cycles/data-update/data-update";
import { Update } from "@/types/Update";
import { Cycle } from "../Cycle";

//  1. Apply all update logs
export class DataUpdateManager implements Cycle {
  constructor(
    readonly root: { [key: string]: any } = {},
    readonly properties: { [key: string]: any } = {}) {
  }

  addUpdate(update: Update) {
    this.root.updates = this.root.updates ?? [];
    this.root.updates.push(update);
  }

  performCycle() {
    commitUpdates(this.root, this.properties);
  }
}
