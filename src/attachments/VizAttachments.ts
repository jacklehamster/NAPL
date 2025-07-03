import { Attachment } from "./Attachment";
import { Context } from "@/context/Context";
import { WorldContext } from "@/context/World";
import { Program } from "@/core/Program";

export class VizAttachment implements Attachment {
  canvas: HTMLCanvasElement = document.createElement("canvas");
  onDetach?(): void;

  refresh(context: Context<WorldContext>) {
    const ctx = this.canvas.getContext("2d")!;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.strokeStyle = "red";
    ctx.lineWidth = 5;
    ctx.beginPath();
    const now = Date.now();
    context.root.world?.elements.forEach(elem => {
      if (elem.type === "hero") {
        ctx.moveTo(elem.x + 40, elem.y);
        ctx.arc(elem.x, elem.y, 40, 0, Math.PI * 2);
        const dx = elem.dx * 2;
        const dy = elem.dy * 2;
        ctx.moveTo(elem.x + dx + 20, elem.y + dy);
        ctx.arc(elem.x + dx, elem.y + dy, 20, 0, Math.PI * 2);
      } else if (elem.type === "chain" && now < elem.expiration) {
        ctx.moveTo(elem.x + 5, elem.y);
        ctx.arc(elem.x, elem.y, 5, 0, Math.PI * 2);
      } else if (elem.type === "ball") {
        ctx.moveTo(elem.x + 20, elem.y);
        ctx.arc(elem.x, elem.y, 20, 0, Math.PI * 2);
      } else if (elem.type === "foe" && now < elem.expiration) {
        if (elem.ko && Math.random() < .7) {
          return;
        }
        const topOffset = elem.ko ? 50 : 0;
        ctx.strokeRect(elem.x - 10, elem.y - 10, 20, 20);
        ctx.strokeRect(elem.x - 15, elem.y - 15, 30, 30);
        ctx.moveTo(elem.x - 10 * 4, elem.y + 5 * 4);
        ctx.lineTo(elem.x, elem.y - 15 * 4 + topOffset);
        ctx.lineTo(elem.x + 10 * 4, elem.y + 5 * 4);
        ctx.lineTo(elem.x - 10 * 4, elem.y + 5 * 4);
      }
    });
    ctx.stroke();

    // Render chain segments
    this.renderChain(context);
  }

  private renderChain(context: Context<WorldContext>) {
    const ctx = this.canvas.getContext("2d")!;
    const segments = context.root.world?.elements.filter(e => e.type === "chainSegment") || [];

    if (segments.length === 0) return;

    // Sort segments by index
    segments.sort((a, b) => (a as any).segmentIndex - (b as any).segmentIndex);

    ctx.beginPath();
    ctx.strokeStyle = "#8B4513"; // Brown color for chain
    ctx.lineWidth = 3;

    // Draw chain segments
    for (let i = 0; i < segments.length - 1; i++) {
      const current = segments[i] as any;
      const next = segments[i + 1] as any;

      // Change color based on tension
      if (current.tension > 0.5) {
        ctx.strokeStyle = "#FF4500"; // Orange-red when taut
        ctx.lineWidth = 4;
      } else if (current.tension > 0.1) {
        ctx.strokeStyle = "#FF8C00"; // Dark orange when some tension
        ctx.lineWidth = 3;
      } else {
        ctx.strokeStyle = "#8B4513"; // Brown when slack
        ctx.lineWidth = 2;
      }

      // Draw segment
      ctx.beginPath();
      ctx.moveTo(current.x, current.y);
      ctx.lineTo(next.x, next.y);
      ctx.stroke();
    }

    // Draw small circles at segment joints
    ctx.fillStyle = "#654321";
    segments.forEach((segment: any) => {
      ctx.beginPath();
      ctx.arc(segment.x, segment.y, 2, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  onAttach(program: Program<WorldContext>): void {
    document.body.appendChild(this.canvas);
    this.canvas.width = program.root?.world?.size.width ?? 1600;
    this.canvas.height = program.root?.world?.size.width ?? 1200;
    this.canvas.style.width = `${this.canvas.width / 2}px`;
    this.canvas.style.height = `${this.canvas.height / 2}px`;

    this.onDetach = () => {
      document.body.removeChild(this.canvas);
    };
  }
}
