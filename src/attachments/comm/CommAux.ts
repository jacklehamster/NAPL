import { CommInterface } from "@/clients/CommInterface";
import { hookCommInterface } from "@/clients/CommInterfaceHook";
import { Context } from "@/context/Context";
import { Processor } from "@/core/Processor";
import { UpdatePath } from "@/cycles/data-update/data-update";

export class CommAux {
  private readonly processor = new Processor();
  readonly disconnect: () => void;

  constructor(
    private readonly comm: CommInterface,
    private readonly context: Context,
  ) {
    const { disconnect } = hookCommInterface(
      context,
      this.comm,
      this.processor,
    );
    this.disconnect = disconnect;
  }

  private readonly _updates = new Map<string, UpdatePath>();
  performCycle(): Map<string, UpdatePath> | void {
    this._updates.clear();
    this.processor.performCycle(this.context, this._updates);
    if (this._updates.size) {
      return this._updates;
    }
  }
}
