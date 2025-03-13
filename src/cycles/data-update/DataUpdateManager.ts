import { commitUpdates } from "@/cycles/data-update/data-update";
import { Update } from "@/types/Update";
import { Cycle } from "../../cycle/Cycle";
import { CycleData } from "@/cycle/CycleData";
import { Data } from "@/types/Data";

//  1. Apply all update logs
export class DataUpdateManager implements Cycle {
  addUpdate(root: Data, update: Update) {
    root.updates = root.updates ?? [];
    root.updates.push(update);
  }

  performCycle(cyleData: CycleData) {
    commitUpdates(cyleData.root, cyleData.properties, cyleData.updatedPaths);
  }
}
