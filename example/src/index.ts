// To recognize dom types (see https://bun.sh/docs/typescript#dom-types):
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

import { SocketClient } from "@dobuki/syncopath";
import { createContext, Data, Processor } from "napl";

const div = document.body.appendChild(document.createElement("div"));
div.style.whiteSpace = "pre";
div.style.fontFamily = "monospace";
div.style.fontSize = "12px";

const root: Data = {
};
const cycleData = createContext(root)

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
  div2.textContent = JSON.stringify(cycleData.outgoingUpdates, null, 2);
}

const socketClient = new SocketClient(location.host, undefined, root);


const processor = new Processor(blob => {
  console.log("Updates sent out", blob);
});
processor.observe(cycleData).onChange(refreshData);

function cycle() {
  processor.performCycle(cycleData);
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
      cycleData.outgoingUpdates = cycleData.outgoingUpdates ?? [];
      cycleData.outgoingUpdates.push({ path: "abc", value: Math.random(), confirmed: 1 });
      refreshData();
    });
  }
}

setupGamePlayer();

export { root, socketClient };
