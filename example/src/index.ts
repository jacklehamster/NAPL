// To recognize dom types (see https://bun.sh/docs/typescript#dom-types):
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

import { Data, Processor, Program } from "napl";
import { joinWebRTCRoom, enterRoom } from "@dobuki/hello-worker";

const root: Data = {};

const program = new Program({
  root,
});

const { sendToAll, sendToUser, enter } = joinWebRTCRoom({
  userId: crypto.randomUUID(),
  enterRoom,
  logLine(direction, obj) {
    console.log(direction, obj);
  },
  onMessage(data, from) {
    program.processor.receivedData(data as ArrayBuffer, program);
    cycle();
  },
});
enter({ room: "napl-demo-room", host: "hello.dobuki.net" });

program.connectComm({
  onNewClient(peer: string) {
    console.log("New peer connected:", peer);
  },
  onMessage(data: Uint8Array, from: string): void {
    console.log("Program received data", data, "from", from);
  },
  send(data: Uint8Array, peer?: string): void {
    console.log("Sending data", data, "to", peer);
    if (peer) {
      sendToUser(data as any, peer);
    } else {
      sendToAll(data as any);
    }
  },
});


function refreshData() {
  const div: HTMLDivElement = document.querySelector("#log-div") ?? document.body.appendChild(document.createElement("div"));
  div.id = "log-div";
  div.style.whiteSpace = "pre";
  div.style.fontFamily = "monospace";
  div.style.fontSize = "20px";
  div.textContent = JSON.stringify(root, null, 2);

  const div2: HTMLDivElement = document.querySelector("#log-div2") ?? document.body.appendChild(document.createElement("div"));
  div2.id = "log-div2";
  div2.style.whiteSpace = "pre";
  div2.style.fontFamily = "monospace";
  div2.style.fontSize = "12px";
  div2.textContent = JSON.stringify(program.outgoingUpdates, null, 2);
}

const processor = new Processor();
processor.connectComm({
  send(data: Uint8Array) {
    console.log("Updates sent out", data);
  }
});
processor.observe().onChange(refreshData);

function cycle() {
  program.processor.performCycle(program);
  program.refresh?.();
  refreshData();
}

function setupGamePlayer() {
  {
    const button = document.body.appendChild(document.createElement("button"));
    button.textContent = "⏯️";
    button.addEventListener("click", cycle);
  }
  {
    const button = document.body.appendChild(document.createElement("button"));
    button.textContent = "🔄";
    button.addEventListener("click", () => {
      program.outgoingUpdates.push({ path: "abc", value: Math.random(), confirmed: 1 });
      refreshData();
    });
  }
}

setupGamePlayer();

export { root };
