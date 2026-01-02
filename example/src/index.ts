// To recognize dom types (see https://bun.sh/docs/typescript#dom-types):
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

import { Data, Program } from "napl";
import { enterWorld } from "@dobuki/hello-worker";
import {uniqueNamesGenerator, adjectives, colors, animals} from "unique-names-generator";
const { generateEmojis } = require("generate-random-emoji");

const root: Record<string, Data> = {};

const { userId, send, enterRoom, addMessageListener, addUserListener, end } = enterWorld({
  appId: "napl-test",
  workerUrl: new URL("./signal-room.worker.js", import.meta.url),
});

let userList: string[] = [];

const program = new Program({
  userId,
  root,
  onDataCycle: refreshData,
});
program.connectComm({
  onMessage: addMessageListener,
  onNewClient: (listener: (user: string) => void) => {
    addUserListener((user, action, users) => {
      if (action === "join") {
        listener(user);
      } else if (action === "leave") {
        program.setData(`users/${user}`, undefined);
      }
      userList = users;
      refreshData();
    });
  },
  send,
  close: end,
});

enterRoom({ room: "napl-demo-room", host: "hello.dobuki.net" });

const emoji = generateEmojis(1)[0].image;

const randomName = uniqueNamesGenerator({ dictionaries: [adjectives, colors, animals] });
program.observe("abc").onChange((value: any) => console.log(value));
program.observe("users").onChange((users: string[]) => console.log("USERS", users));
program.setData("users/~{self}/name", randomName);
program.setData("users/~{self}/emoji", emoji);
program.onIncomingUpdatesReceived = () => refreshData();

addEventListener("mousemove", (e: MouseEvent) => {
  program.setData("cursor/pos", {x: e.pageX, y: e.pageY});
  program.setData("cursor/emoji", emoji);
  program.setData("cursor/user", userId);
});
program.observe(["cursor/pos", "cursor/emoji", "cursor/user"]).onChange(([pos, emoji, user]: [any, string, string]) => {
  const div = document.querySelector("#div-emoji") as HTMLDivElement;
  if (div) {
    const offset = user === userId ? [2, 2]: [-div.offsetWidth / 2, -div.offsetHeight / 2];
    div.style.left = `${pos.x + offset[0]}px`;
    div.style.top = `${pos.y + offset[1]}px`;
    div.textContent = emoji;
  }
});

function refreshData() {
  const div: HTMLDivElement = document.querySelector("#log-div") ?? document.body.appendChild(document.createElement("div"));
  div.id = "log-div";
  div.style.whiteSpace = "pre";
  div.style.fontFamily = "monospace";
  div.style.fontSize = "16px";
  div.textContent = JSON.stringify(root, null, 2) + `\nLast update: ${new Date().toISOString()}\n`;

  const divSplit: HTMLDivElement = document.querySelector("#log-block") ?? document.body.appendChild(document.createElement("div"));
  divSplit.style.display = "flex";
  divSplit.style.flexDirection = "row";

  const divOut: HTMLDivElement = document.querySelector("#log-div-out") ?? divSplit.appendChild(document.createElement("div"));
  divOut.id = "log-div-out";
  divOut.style.flex = "1";
  divOut.style.whiteSpace = "pre";
  divOut.style.fontFamily = "monospace";
  divOut.style.fontSize = "12px";
  divOut.textContent = program.outgoingUpdates.length ? "OUT\n" + JSON.stringify(program.outgoingUpdates, null, 2) : "";

  const divIn: HTMLDivElement = document.querySelector("#log-div-in") ?? divSplit.appendChild(document.createElement("div"));
  divIn.id = "log-div-in";
  divIn.style.flex = "1";
  divIn.style.whiteSpace = "pre";
  divIn.style.fontFamily = "monospace";
  divIn.style.fontSize = "12px";
  divIn.textContent = program.incomingUpdates.length ? "IN\n" + JSON.stringify(program.incomingUpdates, null, 2) : "";

  const usrs = root.users as any;
  const allUsers = [userId, ...userList].map(userId => usrs?.[userId]);

  const divUsers: HTMLDivElement = document.querySelector("#log-div-users") ?? document.body.appendChild(document.createElement("div"));
  divUsers.id = "log-div-users";
  divUsers.style.flex = "1";
  divUsers.style.whiteSpace = "pre";
  divUsers.style.fontFamily = "monospace";
  divUsers.style.fontSize = "12px";
  divUsers.style.position = "absolute";
  divUsers.style.top = "5px";
  divUsers.style.right = "5px";
  divUsers.style.padding = "5px";
  divUsers.style.border = "1px solid black";
  divUsers.style.backgroundColor = "#ffffffaa";
  divUsers.textContent = "USERS\n" + allUsers.map(user => `${user?.emoji} ${user?.name}`).join("\n");

  const divEmoji: HTMLDivElement = document.querySelector("#div-emoji") ?? document.body.appendChild(document.createElement("div"));
  divEmoji.id = "div-emoji";
  divEmoji.style.position = "absolute";
  divEmoji.style.fontSize = "20pt";
  divEmoji.style.opacity = ".5";
}

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
      program.performCycle();
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
    button.addEventListener("mousedown", () => program.performCycle());
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
