import { Attachment } from "./Attachment";
import { Context } from "@/context/Context";
import { WorldContext } from "@/context/World";

export class MomentumAttachment implements Attachment {
  constructor() {
  }

  refresh(context: Context<WorldContext>) {
    const now = context.now;
    context.root.world?.elements.forEach(elem => {
      if ((!elem.expiration || now < elem.expiration) && !elem.ko) {
        elem.x += elem.dx * elem.speed;
        elem.y += elem.dy * elem.speed;
      }
    });
  }
}
