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
  throwForce?: number; // how hard the ball is thrown toward player
  bounceDamping?: number; // how much bounce is reduced on each bounce
  gravity?: number; // gravity strength for ball physics
}

interface ChainSegment extends Element {
  type: "chainSegment";
  segmentIndex: number;
  targetX: number;
  targetY: number;
  tension: number; // 0 = slack, 1 = taut
}

interface Ball extends Element {
  type: "ball";
  height?: number; // height off the ground (0 = on ground)
  velocityY?: number; // vertical velocity for bounce physics
  isThrown?: boolean; // whether ball is currently being thrown
  throwStartTime?: number; // when the throw started
  lastBounceTime?: number; // when the ball last bounced
}

export class BallChainAttachment implements Attachment {
  private chainLength: number;
  private maxTensionDistance: number;
  private ballMass: number;
  private pullStrength: number;
  private slowFactor: number;
  private maxTensionPullStrength: number;
  private chainSegments: number;
  private throwForce: number;
  private bounceDamping: number;
  private gravity: number;

  constructor(config: BallChainConfig = {}) {
    this.chainLength = config.chainLength ?? 100; // pixels
    this.maxTensionDistance = config.maxTensionDistance ?? 150; // absolute max distance
    this.ballMass = config.ballMass ?? 5;         // higher = heavier
    this.pullStrength = config.pullStrength ?? 2.0; // increased pull strength for faster ball movement
    this.slowFactor = config.slowFactor ?? 0.5;   // 0.5 = 50% speed when taut
    this.maxTensionPullStrength = config.maxTensionPullStrength ?? 0.3; // slow ball movement at max tension (increased from 0.1)
    this.chainSegments = config.chainSegments ?? 10; // number of chain segments
    this.throwForce = config.throwForce ?? 8; // how hard the ball is thrown
    this.bounceDamping = config.bounceDamping ?? 0.7; // bounce reduction factor
    this.gravity = config.gravity ?? 0.5; // gravity strength
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

  private handleBallSpinning(context: Context<WorldContext & { keys: Record<string, string> }>, hero: Element, ball: Ball) {
    const keys = context.root.keys;
    const chainLength = this.chainLength;
    const angularSpeed = 2 * Math.PI / 0.5; // 2 full circles per second (faster)
    const dt = 1 / 60; // Assume 60 FPS for smoothness
    if (!('isSpinning' in ball)) (ball as any).isSpinning = false;
    if (!('spinAngle' in ball)) (ball as any).spinAngle = 0;

    if (keys?.Action) {
      if (!(ball as any).isSpinning) {
        // Start spinning: calculate initial angle
        (ball as any).isSpinning = true;
        const dx0 = ball.x - hero.x;
        const dy0 = ball.y - hero.y;
        (ball as any).spinAngle = Math.atan2(dy0, dx0);
      } else {
        // While spinning: increment angle and set position
        (ball as any).spinAngle += angularSpeed * dt;
        ball.x = hero.x + Math.cos((ball as any).spinAngle) * chainLength;
        ball.y = hero.y + Math.sin((ball as any).spinAngle) * chainLength;
        // Ignore all physics while spinning
        ball.dx = 0;
        ball.dy = 0;

        // --- Kill enemies on collision ---
        const elements = context.root.world?.elements || [];
        const now = context.now;
        elements.forEach(e => {
          if (e.type === "foe" && !e.ko && now < e.expiration) {
            const diffX = ball.x - e.x;
            const diffY = ball.y - e.y;
            if (diffX * diffX + diffY * diffY < 900) { // collision radius (30px)
              e.ko = now;
              e._scoreCounted = false; // ensure ScoreAttachment will count this
            }
          }
        });
        // --- End kill enemies ---

        // --- Slow down hero while spinning ---
        hero.dx *= 0.4;
        hero.dy *= 0.4;
        // --- End slow down hero ---
      }
    } else {
      (ball as any).isSpinning = false;
    }
  }

  private handleBallThrowing(context: Context<WorldContext & { keys: Record<string, string> }>, hero: Element, ball: Ball) {
    const keys = context.root.keys;
    const now = context.now;

    // Check if space is pressed and ball is not already being thrown
    if (keys?.Action && !ball.isThrown && ball.height === 0) {
      // Start throwing the ball
      ball.isThrown = true;
      ball.throwStartTime = now;
      ball.height = 5; // Start slightly off ground
      ball.velocityY = 2; // Initial upward velocity

      // Calculate direction toward hero
      const dx = hero.x - ball.x;
      const dy = hero.y - ball.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > 0) {
        // Apply horizontal force toward hero
        ball.dx = (dx / dist) * this.throwForce;
        ball.dy = (dy / dist) * this.throwForce;
      }
    }
  }

  private updateBallPhysics(context: Context<WorldContext>, ball: Ball) {
    const now = context.now;

    if (ball.isThrown && ball.velocityY !== undefined && ball.height !== undefined && ball.throwStartTime !== undefined) {
      // Apply gravity
      ball.velocityY -= this.gravity;
      ball.height += ball.velocityY;

      // Check for ground collision
      if (ball.height <= 0) {
        ball.height = 0;

        // Bounce if velocity is significant
        if (Math.abs(ball.velocityY) > 0.5) {
          ball.velocityY = -ball.velocityY * this.bounceDamping;
          ball.lastBounceTime = now;

          // Reduce horizontal velocity on bounce (but not during flight)
          ball.dx *= 0.8;
          ball.dy *= 0.8;
        } else {
          // Ball has settled
          ball.velocityY = 0;
          ball.isThrown = false;
          // No additional slowdown when landing - let momentum carry it
        }
      }

      // Stop throwing after a certain time or if ball has settled
      if (now - ball.throwStartTime > 3000 || (!ball.isThrown && ball.height === 0)) {
        ball.isThrown = false;
      }
    }
  }

  refresh(context: Context<WorldContext & { keys: Record<string, string> }>) {
    const elements = context.root.world?.elements;
    if (!elements) return;
    const hero = elements.find(e => e.type === "hero");
    const ball = elements.find(e => e.type === "ball") as Ball;
    if (!hero || !ball) return;

    // Initialize ball physics properties if not set
    if (ball.height === undefined) ball.height = 0;
    if (ball.velocityY === undefined) ball.velocityY = 0;
    if (ball.isThrown === undefined) ball.isThrown = false;
    if (ball.throwStartTime === undefined) ball.throwStartTime = 0;
    if (ball.lastBounceTime === undefined) ball.lastBounceTime = 0;

    // Handle ball spinning when space is pressed
    this.handleBallSpinning(context, hero, ball);

    // Only update ball physics if not spinning
    if (!(ball as any).isSpinning) {
      this.updateBallPhysics(context, ball);
    }

    // Only apply chain constraint if not spinning
    let dx = hero.x - ball.x;
    let dy = hero.y - ball.y;
    let dist = Math.sqrt(dx * dx + dy * dy);
    if (!(ball as any).isSpinning) {
      if (dist > this.chainLength) {
        // --- Chain constraint: allow tangential, block radial (away) movement ---
        const chainAngle = Math.atan2(dy, dx);
        const heroSpeed = Math.sqrt(hero.dx * hero.dx + hero.dy * hero.dy);
        if (heroSpeed > 0) {
          const heroAngle = Math.atan2(hero.dy, hero.dx);
          const angleDiff = heroAngle - chainAngle;
          // Radial (away) component
          const radial = Math.cos(angleDiff) * heroSpeed;
          // Tangential component
          const tangential = Math.sin(angleDiff) * heroSpeed;
          // Block only the radial (away) component
          const newRadial = radial > 0 ? 0 : radial;
          const perpAngle = chainAngle + Math.PI / 2;
          hero.dx = Math.cos(chainAngle) * newRadial + Math.cos(perpAngle) * tangential;
          hero.dy = Math.sin(chainAngle) * newRadial + Math.sin(perpAngle) * tangential;
        }
        // Ball gets pulled toward hero (heavy, so slow acceleration)
        const pull = ((dist - this.chainLength) / this.chainLength) * this.pullStrength;
        const fx = (dx / dist) * pull;
        const fy = (dy / dist) * pull;
        ball.dx += fx / this.ballMass;
        ball.dy += fy / this.ballMass;
        // Optionally, slow the hero a bit when chain is taut
        hero.dx *= this.slowFactor;
        hero.dy *= this.slowFactor;
      }
      // else: chain is slack, do nothing
    }

    // Update chain segments
    this.updateChainSegments(elements, hero, ball, dist);
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
