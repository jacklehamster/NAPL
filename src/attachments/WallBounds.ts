import { Context } from "@/context/Context";
import { Attachment } from "./Attachment";
import { WorldContext } from "@/context/World";

export class WallBounds implements Attachment {
  refresh(context: Context<WorldContext>): void {
    context.root.world?.elements?.forEach(element => {
      if (element.x < 0) {
        element.x = 0;
        element.dx = 0;
      }
      if (element.y < 0) {
        element.y = 0;
        element.dy = 0;
      }
      const width = context.root?.world?.size.width ?? 1600;
      const height = context.root?.world?.size.height ?? 1200;
      if (element.x > width) {
        element.x = width;
        element.dx = 0;
      }
      if (element.y > height) {
        element.y = height;
        element.dy = 0;
      }
    });
  }
}
