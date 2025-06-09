import { Connection } from "@/connections/Connection";
import { Program } from "./Program";
import { KeyboardAttachment } from "@/attachments/KeyboardAttachment";
import { VizAttachment } from "@/attachments/VizAttachments";
import { Element, WorldContext } from "@/context/World";
import { Context } from "@/context/Context";

export class Sample {
  program = new Program<WorldContext>();

  findFreeChain(elements: Element[], type: string) {
    const now = Date.now();
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
      expiration: Date.now() + 300,
    });
    return elements.length - 1;
  }

  main(): Connection {
    let score = 0;
    const cycle = this.program.start();
    const observer = this.program.observe("keys/Action").onChange(value => {
      const elements = this.program.root.world?.elements;
      console.log(elements);
      const hero = elements?.[0];
      if (hero && (!hero.fired || this.program.now - hero.fired > 200)) {
        hero.fired = value;
        for (let i = 0; i < 5; i++) {
          const index = this.findFreeChain(elements, "chain");
          elements[index] = {
            type: "chain",
            x: hero.x + hero.dx * i,
            y: hero.y + hero.dy * i,
            dx: hero.dx,
            dy: hero.dy,
            expiration: Date.now() + 2000,
          };
        }
      }
    });
    this.program.attach(new KeyboardAttachment({
      keymapping: {
        "KeyA": "Left",
        "ArrowLeft": "Left",
        "KeyW": "Up",
        "KeyD": "Right",
        "KeyS": "Down",
        "ArrowRight": "Right",
        "ArrowUp": "Up",
        "ArrowDown": "Down",
        "Space": "Action",
      },
    }));
    this.program.attach(new VizAttachment({}));
    const wc = (this.program.root as WorldContext);
    wc.world = {
      lastFoe: 0,
      elements: [
        {
          type: "hero",
          x: 100,
          y: 100,
          dx: 0,
          dy: 0,
          dirX: 0,
          dirY: 0,
        }
      ],
    };
    let nextFoes = 2000;
    let gameOver = false;
    this.program.attach({
      refresh: (context: Context<WorldContext & { keys: Record<string, string> }>) => {
        if (gameOver) {
          return;
        }
        const now = Date.now();

        if (!context.root.world?.lastFoe || Date.now() - context.root.world.lastFoe > nextFoes) {
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
              expiration: Date.now() + 5000,
            };
            context.root.world!.lastFoe = Date.now() + nextFoes;
            nextFoes = Math.max(300, nextFoes - 100);
          }
        }

        context.root.world?.elements.forEach((elem, index) => {
          if (elem.type === "hero") {
            const keys = context.root.keys;
            const kx = (keys?.Left ? -1 : 0) + (keys?.Right ? 1 : 0);
            const ky = (keys?.Up ? -1 : 0) + (keys?.Down ? 1 : 0);
            const mul = (kx || ky) ? 1 / Math.sqrt(kx * kx + ky * ky) : 0;
            const newDx = (elem.dx + (kx * mul)) * .9;
            const newDy = (elem.dy + (ky * mul)) * .9;
            elem.x += newDx;
            elem.y += newDy;
            elem.dx = newDx;
            elem.dy = newDy;

            //  check collision with foe
            context.root.world?.elements.forEach((e, idx) => {
              if (e.type === "foe" && now < e.expiration && !e.ko) {
                const diffX = elem.x - e.x;
                const diffY = elem.y - e.y;
                if (diffX * diffX + diffY * diffY < 1000 && !e.ko) {
                  alert("Game over");
                  gameOver = true;
                  e.ko = Date.now();
                  location.reload();
                }
              }
            });
          } else if (elem.type === "chain" && now < elem.expiration) {
            const speed = 4;
            elem.x += elem.dx * speed;
            elem.y += elem.dy * speed;

            //  check collision with foe
            context.root.world?.elements.forEach((e, idx) => {
              if (e.type === "foe" && now < e.expiration && !e.ko) {
                const diffX = elem.x - e.x;
                const diffY = elem.y - e.y;
                if (diffX * diffX + diffY * diffY < 3000 && !e.ko) {
                  e.ko = Date.now();
                  score++;
                  let d: HTMLDivElement = document.querySelector("#score")!;
                  if (!d) {
                    d = document.body.appendChild(document.createElement("div"));
                    d.id = "score";
                    d.style.fontSize = "40pt";
                  }
                  d.textContent = `${score}`;
                }
              }
            });
          } else if (elem.type === "foe" && now < elem.expiration && !elem.ko) {
            elem.x += elem.dx;
            elem.y += elem.dy;
          }
        });
      }
    });

    return {
      disconnect() {
        cycle.disconnect();
        observer.close();
      }
    }
  }
}
