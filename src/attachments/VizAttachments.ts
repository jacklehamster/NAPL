import { Program } from "@/core/Program";
import { Attachment } from "./Attachment";
import { Context } from "@/context/Context";
import { WorldContext } from "@/context/World";

interface Config {
  path?: string;
}

export class VizAttachment implements Attachment {
  canvas: HTMLCanvasElement = document.createElement("canvas");
  constructor(public config: Config) {
  }

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
      } else if (elem.type === "foe" && now < elem.expiration) {
        if (elem.ko && Math.random() < .7) {
          return;
        }
        ctx.strokeRect(elem.x - 10, elem.y - 10, 20, 20);
        ctx.strokeRect(elem.x - 15, elem.y - 15, 30, 30);
        ctx.moveTo(elem.x - 10 * 4, elem.y + 5 * 4);
        ctx.lineTo(elem.x, elem.y - 15 * 4);
        ctx.lineTo(elem.x + 10 * 4, elem.y + 5 * 4);
        ctx.lineTo(elem.x - 10 * 4, elem.y + 5 * 4);
      }
    });
    ctx.stroke();
  }

  onAttach(program: Program): () => void {
    document.body.appendChild(this.canvas);
    this.canvas.width = 1600;
    this.canvas.height = 1200;
    this.canvas.style.width = `${this.canvas.width / 2}px`;
    this.canvas.style.height = `${this.canvas.height / 2}px`;

    return () => {
      document.body.removeChild(this.canvas);
    };
  }
}
