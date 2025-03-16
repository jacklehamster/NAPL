import { Context } from "./context/Context";

export interface Cycle {
  performCycle(cycleData: Context): void;
}
