import { Context } from "@/cycle/context/Context";
import { commitUpdates } from "@/cycles/data-update/data-update";

export class Processor {
  performCycle(context: Context): void {
    context.root.frame = (context.root.frame ?? 0) + 1;
    commitUpdates(context.root, context.properties);
  }
}
