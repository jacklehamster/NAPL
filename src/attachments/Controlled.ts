import { Context } from "@/context/Context";
import { Attachment } from "./Attachment";
import { Behavior, WorldContext } from "@/context/World";

export class Controlled implements Attachment {
  refresh(context: Context<WorldContext & { keys: Record<string, string> }>): void {
    const keys = context.root.keys;
    const kx = (keys?.Left ? -1 : 0) + (keys?.Right ? 1 : 0);
    const ky = (keys?.Up ? -1 : 0) + (keys?.Down ? 1 : 0);
    const mul = (kx || ky) ? 1 / Math.sqrt(kx * kx + ky * ky) : 0;
    context.root.world?.elements.forEach(elem => {
      if (elem.behavior === Behavior.CONTROL) {
        // Block input during pull cooldown
        if ((elem as any).pullCooldownUntil && context.now < (elem as any).pullCooldownUntil) {
          return;
        }
        const newDx = elem.dx + (kx * mul) * 2;
        const newDy = elem.dy + (ky * mul) * 2;
        elem.dx = newDx;
        elem.dy = newDy;
      }
    });
  }
}
