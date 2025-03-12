import { Cycle } from "../Cycle";

export class DataBindingManager implements Cycle {
  constructor(
    readonly root: { [key: string]: any } = {},
    readonly properties: { [key: string]: any } = {}) {
  }

  addDataBinding() {
    
  }

  performCycle() {
  }
}
