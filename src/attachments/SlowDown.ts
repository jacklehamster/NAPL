import { Context } from "@/context/Context";
import { Attachment } from "./Attachment";
import { WorldContext } from "@/context/World";

export class Slowdown implements Attachment {
  constructor(private value: number = .8) {
  }

  refresh(context: Context<WorldContext>): void {
    context.root.world?.elements.forEach(elem => {
      if (elem.slowdown) {
        // Don't apply slowdown to ball if it's being thrown
        if (elem.type === "ball" && (elem as any).isThrown) {
          return; // Skip slowdown for thrown ball
        }
        elem.dx *= elem.slowdown * this.value;
        elem.dy *= elem.slowdown * this.value;
      }
    });
  }
}
