// To recognize dom types (see https://bun.sh/docs/typescript#dom-types):
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

import { Data, Program } from "napl";
import { enterWorld } from "@dobuki/hello-worker";

const root: Data = {};

const { userId, send, enterRoom, addMessageListener, addUserListener, end } = enterWorld({
  appId: "napl-test",
  logLine: (dir, msg) => console.log(dir, msg),
  workerUrl: new URL("./signal-room.worker.js", import.meta.url),
});

const program = new Program({
  userId,
  root,
});
program.connectComm({
  onMessage: addMessageListener,
  onNewClient: (listener: (user: string) => void) => {
    addUserListener((user, action, users) => {
      if (action === "join") {
        listener(user);
      }
    });
  },
  send,
  close: end,
});

enterRoom({ room: "napl-demo-room", host: "hello.dobuki.net" });

program.observe("abc").onChange((value: any) => console.log(value));

function refreshData() {
  const div: HTMLDivElement = document.querySelector("#log-div") ?? document.body.appendChild(document.createElement("div"));
  div.id = "log-div";
  div.style.whiteSpace = "pre";
  div.style.fontFamily = "monospace";
  div.style.fontSize = "20px";
  div.textContent = JSON.stringify(root, null, 2) + `\nLast update: ${new Date().toISOString()}\n`;

  const divSplit: HTMLDivElement = document.querySelector("#log-block") ?? document.body.appendChild(document.createElement("div"));
  divSplit.style.display = "flex";
  divSplit.style.flexDirection = "row";

  const divOut: HTMLDivElement = document.querySelector("#log-div-out") ?? divSplit.appendChild(document.createElement("div"));
  divOut.id = "log-div-out";
  divOut.style.whiteSpace = "pre";
  divOut.style.fontFamily = "monospace";
  divOut.style.fontSize = "12px";
  divOut.textContent = program.outgoingUpdates.length ? "OUT\n" + JSON.stringify(program.outgoingUpdates, null, 2) : "";

  const divIn: HTMLDivElement = document.querySelector("#log-div-in") ?? divSplit.appendChild(document.createElement("div"));
  divIn.id = "log-div-in";
  divIn.style.whiteSpace = "pre";
  divIn.style.fontFamily = "monospace";
  divIn.style.fontSize = "12px";
  divIn.textContent = program.incomingUpdates.length ? "IN\n" + JSON.stringify(program.incomingUpdates, null, 2) : "";
}

function cycle() {
  if (program.performCycle()) {
    refreshData();
  }
}

program.addIncomingUpdatesListener(() => {
  refreshData();
});

function setupGamePlayer() {
  let paused = false;
  const updateButtons = new Set<() => void>();
  function resetButtons() {
    updateButtons.forEach(callback => callback());
  }
  function startLoop() {
    paused = false;
    let rafId = 0;
    function loop() {
      rafId = requestAnimationFrame(loop);
      cycle();
    }
    rafId = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(rafId);
      paused = true;
    };
  }

  {
    let stop: undefined | (() => void);
    const button = document.body.appendChild(document.createElement("button"));
    button.textContent = "⏸️";
    button.addEventListener("mousedown", () => {
      if (paused) {
        stop = startLoop();
      } else {
        stop?.();
        stop = undefined;
      }
      resetButtons();
    });
    updateButtons.add(() => {
      button.textContent = paused ? "▶️" : "⏸️";
    });
    stop = startLoop();
  }
  {
    const button = document.body.appendChild(document.createElement("button"));
    button.textContent = "⏯️";
    button.addEventListener("mousedown", cycle);
    updateButtons.add(() => {
      button.disabled = !paused;
    })
  }
  {
    const button = document.body.appendChild(document.createElement("button"));
    button.textContent = "🔄";
    button.addEventListener("mousedown", () => {
      program.setData(`abc`, Math.random());
      refreshData();
    });
  }
  resetButtons();
}

setupGamePlayer();

export { root, program };
