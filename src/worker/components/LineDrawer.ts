import { Cursor } from "./CursorComponent";

export function LineDrawer({
  getCanvas,
}: {
  getCanvas: () => OffscreenCanvas | undefined;
}) {
  return {
    draw({ from, to }: { from: Cursor; to: Cursor }, peer?: string) {
      const ctx = getCanvas()?.getContext("2d");
      if (!ctx) return;

      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.lineWidth = to.width;
      ctx.strokeStyle = to.color;
      ctx.lineTo(to.x, to.y);
      ctx.stroke();
    },
  };
}
