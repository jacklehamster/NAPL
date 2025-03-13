import { CycleData } from "@/cycle/CycleData";
import { Cycle } from "../../cycle/Cycle";

export class DataBindingManager implements Cycle {
  constructor(
    readonly root: { [key: string]: any } = {}) {
  }

  performCycle(cyleData: CycleData) {
  }
}
