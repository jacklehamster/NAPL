// To recognize dom types (see https://bun.sh/docs/typescript#dom-types):
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

import { SocketClient } from "@dobuki/syncopath";
import { CodeParser, createContext, Data, DataBindingManager, DataUpdateManager, Processor } from "napl";

const div = document.body.appendChild(document.createElement("div"));
div.style.whiteSpace = "pre";
div.style.fontFamily = "monospace";
div.style.fontSize = "12px";

const root: Data = {
  "binding": "~{abc}",
};
const cycleData = createContext(root)

function refreshData() {
  const div: HTMLDivElement = document.querySelector("#log-div") ?? document.body.appendChild(document.createElement("div"));
  div.id = "log-div";
  div.style.whiteSpace = "pre";
  div.style.fontFamily = "monospace";
  div.style.fontSize = "12px";
  div.textContent = JSON.stringify(root, null, 2);
}

const socketClient = new SocketClient(location.host, undefined, root);
socketClient.observe().onChange(refreshData);


const processor = new Processor(
  new CodeParser(),
  new DataUpdateManager(),
  new DataBindingManager(),
);

function cycle() {
  processor.performCycle(cycleData);
  refreshData();
  console.log("cycle", cycleData);
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
      root.updates = root.updates ?? [];
      root.updates.push({ path: "abc", value: Math.random(), confirmed: true });
      refreshData();
    });
  }
}

setupGamePlayer();

export { root, socketClient };
