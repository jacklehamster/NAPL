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

    // Draw background first
    this.renderBackground(ctx);

    // Render shadows first (so they appear behind elements)
    this.renderShadows(context);

    // Draw all elements
    const now = Date.now();
    context.root.world?.elements.forEach(elem => {
      if (elem.type === "hero") {
        this.renderHero(ctx, elem);
      } else if (elem.type === "chain" && now < elem.expiration) {
        ctx.moveTo(elem.x + 5, elem.y);
        ctx.arc(elem.x, elem.y, 5, 0, Math.PI * 2);
      } else if (elem.type === "foe" && now < elem.expiration) {
        if (elem.ko && Math.random() < .7) {
          return;
        }
        this.renderMonster(ctx, elem);
      }
    });
    ctx.stroke();

    // Render chain segments
    this.renderChain(context);

    // Render ball at height
    this.renderBall(context);
  }

  // --- New: Render a visually appealing background ---
  private renderBackground(ctx: CanvasRenderingContext2D) {
    // Sky gradient
    const sky = ctx.createLinearGradient(0, 0, 0, this.canvas.height);
    sky.addColorStop(0, "#7ec0ee"); // light blue
    sky.addColorStop(1, "#e0f7fa"); // near white
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Distant mountains
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(0, this.canvas.height * 0.7);
    ctx.bezierCurveTo(
      this.canvas.width * 0.2, this.canvas.height * 0.5,
      this.canvas.width * 0.4, this.canvas.height * 0.8,
      this.canvas.width * 0.6, this.canvas.height * 0.6
    );
    ctx.bezierCurveTo(
      this.canvas.width * 0.7, this.canvas.height * 0.5,
      this.canvas.width * 0.9, this.canvas.height * 0.8,
      this.canvas.width, this.canvas.height * 0.7
    );
    ctx.lineTo(this.canvas.width, this.canvas.height);
    ctx.lineTo(0, this.canvas.height);
    ctx.closePath();
    ctx.fillStyle = "#b0bec5";
    ctx.globalAlpha = 0.5;
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.restore();

    // Ground
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(0, this.canvas.height * 0.85);
    for (let x = 0; x <= this.canvas.width; x += 40) {
      const y = this.canvas.height * 0.85 + 10 * Math.sin(x / 60);
      ctx.lineTo(x, y);
    }
    ctx.lineTo(this.canvas.width, this.canvas.height);
    ctx.lineTo(0, this.canvas.height);
    ctx.closePath();
    const ground = ctx.createLinearGradient(0, this.canvas.height * 0.85, 0, this.canvas.height);
    ground.addColorStop(0, "#4caf50");
    ground.addColorStop(1, "#795548");
    ctx.fillStyle = ground;
    ctx.fill();
    ctx.restore();

    // --- Decorations: clouds ---
    this.renderClouds(ctx);
    // --- Decorations: grass tufts ---
    this.renderGrass(ctx);
    // --- Decorations: rocks ---
    this.renderRocks(ctx);
  }

  // --- New: Draw clouds ---
  private renderClouds(ctx: CanvasRenderingContext2D) {
    const clouds = [
      { x: 120, y: 80, s: 1 },
      { x: 400, y: 60, s: 1.3 },
      { x: 700, y: 100, s: 0.8 },
      { x: 1000, y: 70, s: 1.1 },
      { x: 1400, y: 90, s: 0.9 },
    ];
    ctx.save();
    ctx.globalAlpha = 0.7;
    ctx.fillStyle = "#fff";
    clouds.forEach(cloud => {
      ctx.beginPath();
      ctx.ellipse(cloud.x, cloud.y, 40 * cloud.s, 18 * cloud.s, 0, 0, Math.PI * 2);
      ctx.ellipse(cloud.x + 30 * cloud.s, cloud.y + 5 * cloud.s, 25 * cloud.s, 12 * cloud.s, 0, 0, Math.PI * 2);
      ctx.ellipse(cloud.x - 25 * cloud.s, cloud.y + 8 * cloud.s, 22 * cloud.s, 10 * cloud.s, 0, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;
    ctx.restore();
  }

  // --- New: Draw grass tufts ---
  private renderGrass(ctx: CanvasRenderingContext2D) {
    ctx.save();
    for (let x = 30; x < this.canvas.width; x += 70) {
      const baseY = this.canvas.height * 0.85 + 8 * Math.sin(x / 60);
      ctx.beginPath();
      ctx.moveTo(x, baseY);
      ctx.lineTo(x - 4, baseY + 14);
      ctx.lineTo(x + 2, baseY + 8);
      ctx.lineTo(x + 4, baseY + 14);
      ctx.lineTo(x + 2, baseY);
      ctx.closePath();
      ctx.fillStyle = "#388e3c";
      ctx.globalAlpha = 0.7;
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    ctx.restore();
  }

  // --- New: Draw rocks ---
  private renderRocks(ctx: CanvasRenderingContext2D) {
    ctx.save();
    const rocks = [
      { x: 200, y: this.canvas.height * 0.87, r: 12 },
      { x: 600, y: this.canvas.height * 0.89, r: 8 },
      { x: 900, y: this.canvas.height * 0.88, r: 16 },
      { x: 1300, y: this.canvas.height * 0.86, r: 10 },
    ];
    ctx.fillStyle = "#888";
    ctx.globalAlpha = 0.8;
    rocks.forEach(rock => {
      ctx.beginPath();
      ctx.ellipse(rock.x, rock.y, rock.r, rock.r * 0.7, 0, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;
    ctx.restore();
  }

  // --- New: Render a stylized hero (prisoner) ---
  private renderHero(ctx: CanvasRenderingContext2D, elem: any) {
    ctx.save();
    // Body shadow
    ctx.beginPath();
    ctx.ellipse(elem.x, elem.y + 50, 35, 12, 0, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(0,0,0,0.18)";
    ctx.filter = "blur(1.5px)";
    ctx.fill();
    ctx.filter = "none";

    // Ball and chain (left leg)
    ctx.save();
    ctx.strokeStyle = "#444";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(elem.x - 15, elem.y + 40);
    ctx.lineTo(elem.x - 30, elem.y + 60);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(elem.x - 30, elem.y + 65, 8, 0, Math.PI * 2);
    ctx.fillStyle = "#888";
    ctx.shadowColor = "#222";
    ctx.shadowBlur = 4;
    ctx.fill();
    ctx.restore();

    // Body
    ctx.beginPath();
    ctx.ellipse(elem.x, elem.y + 25, 18, 28, 0, 0, Math.PI * 2);
    ctx.fillStyle = "#fff";
    ctx.strokeStyle = "#222";
    ctx.lineWidth = 2;
    ctx.fill();
    ctx.stroke();

    // Prison stripes
    for (let i = -3; i <= 3; i++) {
      ctx.beginPath();
      ctx.moveTo(elem.x - 16, elem.y + 25 + i * 7);
      ctx.lineTo(elem.x + 16, elem.y + 25 + i * 7);
      ctx.strokeStyle = i % 2 === 0 ? "#222" : "#bbb";
      ctx.lineWidth = 3;
      ctx.stroke();
    }

    // Head
    ctx.beginPath();
    ctx.arc(elem.x, elem.y, 15, 0, Math.PI * 2);
    ctx.fillStyle = "#ffe0b2";
    ctx.strokeStyle = "#222";
    ctx.lineWidth = 2;
    ctx.shadowColor = "#000";
    ctx.shadowBlur = 4;
    ctx.fill();
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Face (simple eyes and mouth)
    ctx.beginPath();
    ctx.arc(elem.x - 5, elem.y - 2, 2, 0, Math.PI * 2);
    ctx.arc(elem.x + 5, elem.y - 2, 2, 0, Math.PI * 2);
    ctx.fillStyle = "#222";
    ctx.fill();
    ctx.beginPath();
    ctx.arc(elem.x, elem.y + 4, 5, 0, Math.PI);
    ctx.strokeStyle = "#222";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Arms
    ctx.beginPath();
    ctx.moveTo(elem.x - 18, elem.y + 20);
    ctx.lineTo(elem.x - 32, elem.y + 35);
    ctx.moveTo(elem.x + 18, elem.y + 20);
    ctx.lineTo(elem.x + 32, elem.y + 35);
    ctx.strokeStyle = "#222";
    ctx.lineWidth = 3;
    ctx.stroke();

    // Legs
    ctx.beginPath();
    ctx.moveTo(elem.x - 10, elem.y + 50);
    ctx.lineTo(elem.x - 15, elem.y + 40);
    ctx.moveTo(elem.x + 10, elem.y + 50);
    ctx.lineTo(elem.x + 15, elem.y + 40);
    ctx.strokeStyle = "#222";
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.restore();
  }

  private renderShadows(context: Context<WorldContext>) {
    const ctx = this.canvas.getContext("2d")!;
    const now = Date.now();

    // Set shadow style
    ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
    ctx.strokeStyle = "rgba(0, 0, 0, 0.2)";
    ctx.lineWidth = 1;

    context.root.world?.elements.forEach(elem => {
      if (elem.type === "hero") {
        // Hero shadow (flattened ellipse for 45-degree angle)
        ctx.beginPath();
        ctx.ellipse(elem.x, elem.y + 50, 35, 12, 0, 0, Math.PI * 2);
        ctx.fill();

        // Direction indicator shadow (flattened ellipse)
        const dx = elem.dx * 2;
        const dy = elem.dy * 2;
        ctx.beginPath();
        ctx.ellipse(elem.x + dx, elem.y + dy + 50, 15, 5, 0, 0, Math.PI * 2);
        ctx.fill();

      } else if (elem.type === "ball") {
        // Ball shadow (flattened ellipse for 45-degree angle)
        const ballHeight = (elem as any).height || 0;
        const shadowSize = Math.max(5, 15 - ballHeight * 2); // Shadow gets smaller as ball rises
        ctx.beginPath();
        ctx.ellipse(elem.x, elem.y + 30, shadowSize, shadowSize * 0.4, 0, 0, Math.PI * 2);
        ctx.fill();

      } else if (elem.type === "foe" && now < elem.expiration && !elem.ko) {
        // Foe shadow (flattened ellipse for 45-degree angle)
        ctx.beginPath();
        ctx.ellipse(elem.x, elem.y + 20, 12, 4, 0, 0, Math.PI * 2);
        ctx.fill();

      } else if (elem.type === "chain" && now < elem.expiration) {
        // Chain projectile shadow (flattened ellipse)
        ctx.beginPath();
        ctx.ellipse(elem.x, elem.y + 15, 3, 1, 0, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    // Chain segment shadows (flattened dots for 45-degree angle)
    const segments = context.root.world?.elements.filter(e => e.type === "chainSegment") || [];
    segments.forEach((segment: any) => {
      ctx.beginPath();
      ctx.ellipse(segment.x, segment.y + 10, 1, 0.3, 0, 0, Math.PI * 2);
      ctx.fill();
    });
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

  private renderBall(context: Context<WorldContext>) {
    const ctx = this.canvas.getContext("2d")!;
    const ball = context.root.world?.elements.find(e => e.type === "ball");

    if (ball) {
      const ballHeight = (ball as any).height || 0;
      const isThrown = (ball as any).isThrown || false;

      // Ball (rendered at height)
      ctx.strokeStyle = isThrown ? "#FF6B35" : "red"; // Orange when thrown, red when normal
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(ball.x, ball.y - ballHeight, 20, 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  // --- New: Render a cartoonish monster (foe) ---
  private renderMonster(ctx: CanvasRenderingContext2D, elem: any) {
    ctx.save();
    // Shadow
    ctx.beginPath();
    ctx.ellipse(elem.x, elem.y + 20, 18, 7, 0, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(0,0,0,0.18)";
    ctx.filter = "blur(1.2px)";
    ctx.fill();
    ctx.filter = "none";

    // Body (round, gradient)
    const grad = ctx.createRadialGradient(elem.x, elem.y, 10, elem.x, elem.y, 30);
    grad.addColorStop(0, "#fff176");
    grad.addColorStop(1, "#f44336");
    ctx.beginPath();
    ctx.arc(elem.x, elem.y, 28, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.shadowColor = "#f44336";
    ctx.shadowBlur = 10;
    ctx.fill();
    ctx.shadowBlur = 0;

    // Horns
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(elem.x - 16, elem.y - 18);
    ctx.lineTo(elem.x - 26, elem.y - 38);
    ctx.lineTo(elem.x - 10, elem.y - 22);
    ctx.closePath();
    ctx.fillStyle = "#fff";
    ctx.strokeStyle = "#b71c1c";
    ctx.lineWidth = 2;
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(elem.x + 16, elem.y - 18);
    ctx.lineTo(elem.x + 26, elem.y - 38);
    ctx.lineTo(elem.x + 10, elem.y - 22);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    // Eyes (glowing)
    ctx.save();
    ctx.beginPath();
    ctx.arc(elem.x - 8, elem.y - 4, 4, 0, Math.PI * 2);
    ctx.arc(elem.x + 8, elem.y - 4, 4, 0, Math.PI * 2);
    ctx.fillStyle = "#fff";
    ctx.shadowColor = "#fffde7";
    ctx.shadowBlur = 8;
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.beginPath();
    ctx.arc(elem.x - 8, elem.y - 4, 2, 0, Math.PI * 2);
    ctx.arc(elem.x + 8, elem.y - 4, 2, 0, Math.PI * 2);
    ctx.fillStyle = "#00e676";
    ctx.fill();
    ctx.restore();

    // Mouth (with fangs)
    ctx.save();
    ctx.beginPath();
    ctx.arc(elem.x, elem.y + 10, 10, 0, Math.PI, false);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#222";
    ctx.stroke();
    // Fangs
    ctx.beginPath();
    ctx.moveTo(elem.x - 5, elem.y + 15);
    ctx.lineTo(elem.x - 7, elem.y + 22);
    ctx.lineTo(elem.x - 3, elem.y + 15);
    ctx.moveTo(elem.x + 5, elem.y + 15);
    ctx.lineTo(elem.x + 7, elem.y + 22);
    ctx.lineTo(elem.x + 3, elem.y + 15);
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();

    // Claws (arms)
    ctx.save();
    ctx.strokeStyle = "#b71c1c";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(elem.x - 20, elem.y + 10);
    ctx.lineTo(elem.x - 38, elem.y + 24);
    ctx.moveTo(elem.x + 20, elem.y + 10);
    ctx.lineTo(elem.x + 38, elem.y + 24);
    ctx.stroke();
    // Claw tips
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(elem.x - 38, elem.y + 24);
    ctx.lineTo(elem.x - 42, elem.y + 28);
    ctx.moveTo(elem.x + 38, elem.y + 24);
    ctx.lineTo(elem.x + 42, elem.y + 28);
    ctx.stroke();
    ctx.restore();

    ctx.restore();
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
