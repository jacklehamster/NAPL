import { Connection } from "@/connections/Connection";
import { Program } from "./Program";
import { Keyboard } from "@/attachments/Keyboard";
import { VizAttachment } from "@/attachments/VizAttachments";
import { Behavior, Element, WorldContext } from "@/context/World";
import { Context } from "@/context/Context";
import { MomentumAttachment } from "@/attachments/Momentum";
import { Controlled } from "@/attachments/Controlled";
import { WallBounds } from "@/attachments/WallBounds";
import { Slowdown } from "@/attachments/SlowDown";
import { BallChainAttachment } from "@/attachments/BallChain";

export class Sample {
  program = new Program<WorldContext>();

  findFreeChain(elements: Element[], type: string) {
    const now = this.program.now;
    for (let i = 0; i < elements.length; i++) {
      if (elements[i].type === type && now > elements[i].expiration) {
        return i;
      }
    }
    elements.push({
      type,
      x: 0,
      y: 0,
      dx: 0,
      dy: 0,
      speed: 1,
      expiration: now + 300,
    });
    return elements.length - 1;
  }

  main(): Connection {
    let score = 0;
    const cycle = this.program.start();
    // const observer = this.program.observe("keys/Action").onChange(value => {
    //   const elements = this.program.root.world?.elements;
    //   const hero = elements?.[0];
    //   if (hero && (!hero.fired || this.program.now - hero.fired > 200)) {
    //     hero.fired = value;
    //     for (let i = 0; i < 5; i++) {
    //       const index = this.findFreeChain(elements, "chain");
    //       elements[index] = {
    //         type: "chain",
    //         x: hero.x + hero.dx * i,
    //         y: hero.y + hero.dy * i,
    //         dx: hero.dx,
    //         dy: hero.dy,
    //         speed: 4 * hero.speed,
    //         expiration: this.program.now + 2000,
    //       };
    //     }
    //   }
    // });
    this.program.attach(new Keyboard({
      keys: [
        [["KeyA", "ArrowLeft"], ["Left"]],
        [["KeyW", "ArrowUp"], ["Up"]],
        [["KeyS", "ArrowDown"], ["Down"]],
        [["KeyD", "ArrowRight"], ["Right"]],
        [["Space"], ["Action"]],
      ]
    }));
    this.program.attach(new MomentumAttachment());
    this.program.attach(new VizAttachment());
    this.program.attach(new Controlled());
    this.program.attach(new Slowdown());
    this.program.attach(new WallBounds());

    const wc = (this.program.root as WorldContext);
    wc.world = {
      lastFoe: 0,
      elements: [
        {
          type: "hero",
          x: 500,
          y: 300,
          dx: 0,
          dy: 0,
          dirX: 0,
          dirY: 0,
          speed: 2,
          expiration: 0,
          behavior: Behavior.CONTROL,
          slowdown: 1,
        },
        {
          type: "ball",
          x: 500,
          y: 400,
          dx: 0,
          dy: 0,
          speed: 3,
          expiration: 0,
          slowdown: .5,
        },
      ],
      size: {
        width: 1600,
        height: 1200,
      }
    };
    // Attach the ball-chain physics
    this.program.attach(new BallChainAttachment());
    let nextFoes = 2000;
    this.program.attach({
      refresh: (context: Context<WorldContext & { keys: Record<string, string> }>) => {
        if (context.root.world?.gameOver) {
          return;
        }
        const now = context.now;

        if (!context.root.world?.lastFoe || now - context.root.world.lastFoe > nextFoes) {
          const elements = context.root.world?.elements;
          const hero = elements?.[0];
          if (hero) {
            const index = this.findFreeChain(elements, "foe");
            const randomAngle = Math.random() * Math.PI * 2;

            const px = hero.x + 500 * Math.cos(randomAngle);
            const py = hero.y + 500 * Math.sin(randomAngle);
            elements[index] = {
              type: "foe",
              x: px,
              y: py,
              dx: (hero.x - px) / 100,
              dy: (hero.y - py) / 100,
              expiration: now + 5000,
              speed: 1,
            };
            context.root.world!.lastFoe = now + nextFoes;
            nextFoes = Math.max(300, nextFoes - 100);
          }
        }

        context.root.world?.elements.forEach((elem) => {
          if (elem.type === "hero") {
            //  check collision with foe
            context.root.world?.elements.forEach((e) => {
              if (e.type === "foe" && now < e.expiration && !e.ko) {
                const diffX = elem.x - e.x;
                const diffY = elem.y - e.y;
                if (diffX * diffX + diffY * diffY < 1000) {
                  context.root.world!.gameOver = true;
                  e.ko = now;
                  elem.ko = now;
                }
              }
            });
          } else if (elem.type === "chain" && now < elem.expiration) {
            //  check collision with foe
            context.root.world?.elements.forEach((e) => {
              if (e.type === "foe" && now < e.expiration && !e.ko) {
                const diffX = elem.x - e.x;
                const diffY = elem.y - e.y;
                if (diffX * diffX + diffY * diffY < 3000) {
                  e.ko = now;
                }
              }
            });
          }
        });
      }
    });

    this.program.attach(new ScoreAttachment());

    return {
      disconnect() {
        cycle.disconnect();
        // observer.close();
      }
    }
  }
}

class ScoreAttachment {
  private score = 0;
  refresh(context: Context<WorldContext>) {
    const now = context.now;
    const elements = context.root.world?.elements || [];
    let scoreChanged = false;
    elements.forEach(e => {
      if (e.type === "foe" && e.ko && !e._scoreCounted) {
        this.score++;
        e._scoreCounted = true;
        scoreChanged = true;
      }
    });
    if (scoreChanged) {
      let d: HTMLDivElement = document.querySelector("#score")!;
      if (!d) {
        d = document.body.appendChild(document.createElement("div"));
        d.id = "score";
        d.style.fontSize = "40pt";
      }
      d.textContent = `${this.score}`;
    }
  }
}
