// To recognize dom types (see https://bun.sh/docs/typescript#dom-types):
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

import { createApp } from "napl";
import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from "unique-names-generator";
const { generateEmojis } = require("generate-random-emoji");

function setupApp() {
  const urlVars = new URLSearchParams(location.search);
  const room = urlVars.get("room");
  let userList: string[] = [];

  const { userId, enterRoom, program } = createApp({
    appId: "napl-test",
    onDataCycle: refreshData,
    onReceivedIncomingUpdates: refreshData,
    onUsersJoined: (_, users) => {
      userList = users;
      refreshData();
    },
    onUsersLeft: (user, users) => {
      program.setData(`users/${user}`, null);
      userList = users;
      refreshData();
    },
    workerUrl: new URL("./signal-room.worker.js", import.meta.url),
  });

  enterRoom({ room: room ?? "test-room", host: "hello.dobuki.net" });

  const randomName = uniqueNamesGenerator({
    dictionaries: [adjectives, colors, animals],
  });
  program.observe("abc").onChange((value: any) => console.log(value));
  program.observe("users").onChange((users: string[]) => {
    console.log("USERS", users);
  });
  program.setData("users/~{self}/name", randomName);
  program.setData("users/~{self}/emoji", generateEmojis(1)[0].image);

  addEventListener("mousemove", (e: MouseEvent) => {
    const linked = program.getData("users/~{self}/linked") ?? true;
    if (linked) {
      program.setData("cursor/pos", { x: e.pageX, y: e.pageY });
      program.setData("cursor/user", userId);
      refreshData();
    }
  });
  program
    .observe(["cursor/pos", "cursor/user"])
    .onChange(([pos, user]: [any, string, string]) => {
      const div = document.querySelector("#div-emoji") as HTMLDivElement;
      if (div) {
        const offset =
          user === userId
            ? [2, 2]
            : [-div.offsetWidth / 2, -div.offsetHeight / 2];
        div.style.left = `${pos.x + offset[0]}px`;
        div.style.top = `${pos.y + offset[1]}px`;
        const emoji = program.getData(`users/${user}/emoji`) ?? "";
        div.textContent = emoji;
      }
    });

  function refreshData() {
    program.consolidateUpdates();
    const div: HTMLDivElement =
      document.querySelector("#log-div") ??
      document.body.appendChild(document.createElement("div"));
    div.id = "log-div";
    div.style.whiteSpace = "pre";
    div.style.fontFamily = "monospace";
    div.style.fontSize = "16px";
    div.textContent =
      JSON.stringify(program.root, null, 2) +
      `\nLast update: ${new Date().toISOString()}\n`;

    const divSplit: HTMLDivElement =
      document.querySelector("#log-block") ??
      document.body.appendChild(document.createElement("div"));
    divSplit.style.display = "flex";
    divSplit.style.flexDirection = "row";

    const divOut: HTMLDivElement =
      document.querySelector("#log-div-out") ??
      divSplit.appendChild(document.createElement("div"));
    divOut.id = "log-div-out";
    divOut.style.flex = "1";
    divOut.style.whiteSpace = "pre";
    divOut.style.fontFamily = "monospace";
    divOut.style.fontSize = "12px";
    divOut.textContent = program.outgoingUpdates.length
      ? "OUT\n" + JSON.stringify(program.outgoingUpdates, null, 2)
      : "";

    const divIn: HTMLDivElement =
      document.querySelector("#log-div-in") ??
      divSplit.appendChild(document.createElement("div"));
    divIn.id = "log-div-in";
    divIn.style.flex = "1";
    divIn.style.whiteSpace = "pre";
    divIn.style.fontFamily = "monospace";
    divIn.style.fontSize = "12px";
    divIn.textContent = program.incomingUpdates.length
      ? "IN\n" + JSON.stringify(program.incomingUpdates, null, 2)
      : "";

    const usrs = program.root.users as any;
    const allUsers = [userId, ...userList].map((userId) => [
      usrs?.[userId],
      userId,
    ]);

    const divUsers: HTMLDivElement =
      document.querySelector("#log-div-users") ??
      document.body.appendChild(document.createElement("div"));
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
    divUsers.style.display = "flex";
    divUsers.style.flexDirection = "column";
    divUsers.innerHTML = "";
    allUsers.forEach(([user, id]) => {
      const group = divUsers.appendChild(document.createElement("div"));
      group.style.display = "flex";
      group.style.flexDirection = "row";
      const emoji = group.appendChild(document.createElement("div"));
      emoji.style.width = "20px";
      emoji.style.textAlign = "center";
      emoji.textContent = user?.emoji ?? "";
      emoji.style.cursor = "pointer";
      emoji.addEventListener("mousedown", () => {
        const newEmoji = generateEmojis(1)[0].image;
        program.setData(`users/${id}/emoji`, newEmoji);
        if (program.getData("cursor/user") === id) {
          program.setData("cursor/emoji", newEmoji);
        }
        refreshData();
      });
      const name = group.appendChild(document.createElement("div"));
      name.textContent = user?.name ?? "";
      name.style.width = "200px";
      const link = group.appendChild(document.createElement("div"));
      const linked = program.getData(`users/${id}/linked`) ?? true;
      link.textContent = linked ? "🔗" : "🚫";
      link.style.cursor = "pointer";
      link.addEventListener("mousedown", () => {
        program.setData(`users/${id}/linked`, !linked);
        refreshData();
      });
    });

    const divEmoji: HTMLDivElement =
      document.querySelector("#div-emoji") ??
      document.body.appendChild(document.createElement("div"));
    divEmoji.id = "div-emoji";
    divEmoji.style.position = "absolute";
    divEmoji.style.fontSize = "20pt";
    divEmoji.style.opacity = ".5";
  }

  function setupGamePlayer() {
    let paused = false;
    const updateButtons = new Set<() => void>();
    function resetButtons() {
      updateButtons.forEach((callback) => callback());
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
      const button = document.body.appendChild(
        document.createElement("button"),
      );
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

      //  Initially start
      setTimeout(() => {
        console.log("Starting progrram...");
        stop = startLoop();
      }, 1000);
    }
    {
      const button = document.body.appendChild(
        document.createElement("button"),
      );
      button.textContent = "⏯️";
      button.addEventListener("mousedown", () => program.performCycle());
      updateButtons.add(() => {
        button.disabled = !paused;
      });
    }
    {
      const button = document.body.appendChild(
        document.createElement("button"),
      );
      button.textContent = "🔄";
      button.addEventListener("mousedown", () => {
        program.setData(`abc`, Math.random());
        refreshData();
      });
    }
    resetButtons();
  }

  setupGamePlayer();
}

export { setupApp };
