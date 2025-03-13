import { CycleData } from "./CycleData";

export interface Cycle {
  performCycle(cycleData: CycleData): void;
}
