import { Context } from "@/context/Context";
import { Attachment } from "./Attachment";
import { WorldContext } from "@/context/World";

export class Slowdown implements Attachment {
  constructor(private value: number = .8) {
  }

  refresh(context: Context<WorldContext>): void {
    context.root.world?.elements.forEach(elem => {
      if (elem.slowdown) {
        elem.dx *= elem.slowdown * this.value;
        elem.dy *= elem.slowdown * this.value;
      }
    });
  }
}
