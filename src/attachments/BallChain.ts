import { Attachment } from "./Attachment";
import { Context } from "@/context/Context";
import { WorldContext, Element } from "@/context/World";

interface BallChainConfig {
  chainLength?: number; // max allowed distance before tension
  maxTensionDistance?: number; // absolute maximum distance (hard limit)
  ballMass?: number;    // how heavy the ball is (affects acceleration)
  pullStrength?: number; // how hard the chain pulls
  slowFactor?: number;  // how much the hero is slowed when chain is taut
  maxTensionPullStrength?: number; // how much the hero can pull the ball at max tension
  chainSegments?: number; // number of chain segments to render
}

interface ChainSegment extends Element {
  type: "chainSegment";
  segmentIndex: number;
  targetX: number;
  targetY: number;
  tension: number; // 0 = slack, 1 = taut
}

export class BallChainAttachment implements Attachment {
  private chainLength: number;
  private maxTensionDistance: number;
  private ballMass: number;
  private pullStrength: number;
  private slowFactor: number;
  private maxTensionPullStrength: number;
  private chainSegments: number;

  constructor(config: BallChainConfig = {}) {
    this.chainLength = config.chainLength ?? 100; // pixels
    this.maxTensionDistance = config.maxTensionDistance ?? 150; // absolute max distance
    this.ballMass = config.ballMass ?? 5;         // higher = heavier
    this.pullStrength = config.pullStrength ?? 0.5; // force applied to ball (increased from 0.2)
    this.slowFactor = config.slowFactor ?? 0.5;   // 0.5 = 50% speed when taut
    this.maxTensionPullStrength = config.maxTensionPullStrength ?? 0.3; // slow ball movement at max tension (increased from 0.1)
    this.chainSegments = config.chainSegments ?? 10; // number of chain segments
  }

  onAttach(program: any) {
    // Initialize chain segments when attachment is added
    this.initializeChainSegments(program);
  }

  private initializeChainSegments(program: any) {
    const elements = program.root.world?.elements;
    if (!elements) return;

    const hero = elements.find((e: Element) => e.type === "hero");
    const ball = elements.find((e: Element) => e.type === "ball");
    if (!hero || !ball) return;

    // Remove existing chain segments
    const existingSegments = elements.filter((e: Element) => e.type === "chainSegment");
    existingSegments.forEach((segment: Element) => {
      const index = elements.indexOf(segment);
      if (index > -1) elements.splice(index, 1);
    });

    // Create new chain segments
    for (let i = 0; i < this.chainSegments; i++) {
      const t = i / (this.chainSegments - 1); // 0 to 1
      const segment: ChainSegment = {
        type: "chainSegment",
        x: ball.x + (hero.x - ball.x) * t,
        y: ball.y + (hero.y - ball.y) * t,
        dx: 0,
        dy: 0,
        speed: 0,
        expiration: 0,
        segmentIndex: i,
        targetX: ball.x + (hero.x - ball.x) * t,
        targetY: ball.y + (hero.y - ball.y) * t,
        tension: 0
      };
      elements.push(segment);
    }
  }

  refresh(context: Context<WorldContext>) {
    const elements = context.root.world?.elements;
    if (!elements) return;
    const hero = elements.find(e => e.type === "hero");
    const ball = elements.find(e => e.type === "ball");
    if (!hero || !ball) return;

    const dx = hero.x - ball.x;
    const dy = hero.y - ball.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    // Update chain segments
    this.updateChainSegments(elements, hero, ball, dist);

    if (dist > this.maxTensionDistance) {
      // Chain is at maximum tension: hero can slowly pull the ball
      const angle = Math.atan2(dy, dx);
      const heroSpeed = Math.sqrt(hero.dx * hero.dx + hero.dy * hero.dy);

      if (heroSpeed > 0) {
        const heroAngle = Math.atan2(hero.dy, hero.dx);
        const angleDiff = Math.abs(heroAngle - angle);

        // If hero is trying to move away from ball, transfer some of that force to the ball
        if (angleDiff < Math.PI / 2) {
          const awayComponent = Math.cos(angleDiff) * heroSpeed;
          // Apply a small force to the ball in the direction the hero is trying to move
          const ballPullForce = awayComponent * this.maxTensionPullStrength;
          ball.dx += Math.cos(heroAngle) * ballPullForce / this.ballMass;
          ball.dy += Math.sin(heroAngle) * ballPullForce / this.ballMass;

          // Significantly slow down the hero's movement away from the ball
          hero.dx *= 0.1;
          hero.dy *= 0.1;
        }
      }

      // Keep hero within max distance
      if (dist > this.maxTensionDistance) {
        hero.x = ball.x + Math.cos(angle) * this.maxTensionDistance;
        hero.y = ball.y + Math.sin(angle) * this.maxTensionDistance;
      }
    } else if (dist > this.chainLength) {
      // Chain is taut: apply force to ball, slow hero
      const pull = ((dist - this.chainLength) / this.chainLength) * this.pullStrength;
      const fx = (dx / dist) * pull;
      const fy = (dy / dist) * pull;
      // Ball gets pulled toward hero (heavy, so slow acceleration)
      ball.dx += fx / this.ballMass;
      ball.dy += fy / this.ballMass;
      // Hero is slowed down
      hero.dx *= this.slowFactor;
      hero.dy *= this.slowFactor;
    }
    // else: chain is slack, do nothing
  }

  private updateChainSegments(elements: Element[], hero: Element, ball: Element, dist: number) {
    const segments = elements.filter(e => e.type === "chainSegment") as ChainSegment[];
    if (segments.length === 0) return;

    // Calculate tension (0 = slack, 1 = taut)
    const tension = dist > this.chainLength ? Math.min(1, (dist - this.chainLength) / (this.maxTensionDistance - this.chainLength)) : 0;

    segments.forEach((segment, index) => {
      const t = index / (segments.length - 1); // 0 to 1

      if (tension > 0.1) {
        // Chain is taut - segments form a straight line
        segment.x = ball.x + (hero.x - ball.x) * t;
        segment.y = ball.y + (hero.y - ball.y) * t;
        segment.tension = tension;
      } else {
        // Chain is slack - segments hang down with gravity effect
        const slackOffset = Math.sin(t * Math.PI) * 20 * (1 - tension); // Curved chain effect
        segment.x = ball.x + (hero.x - ball.x) * t;
        segment.y = ball.y + (hero.y - ball.y) * t + slackOffset;
        segment.tension = tension;
      }

      // Update target positions for smooth movement
      segment.targetX = segment.x;
      segment.targetY = segment.y;
    });
  }
} 
