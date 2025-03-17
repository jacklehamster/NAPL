import { Context } from "@/cycle/context/Context";
import { clearUpdates, commitUpdates } from "@/cycles/data-update/data-update";

export class Processor {
  performCycle(context: Context): void {
    context.root.frame = (context.root.frame ?? 0) + 1;
    const updatedPaths = new Set<string>();
    commitUpdates(context.root, context.properties, updatedPaths);
    clearUpdates(context.root, updatedPaths);
  }
}
