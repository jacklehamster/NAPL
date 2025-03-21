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


const processor = new Processor(blob => {
  processor.processBlob(blob, cycleData).then(() => {
    refreshData();
  });
});

function cycle() {
  processor.performCycle(cycleData);
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
      root.outgoingUpdates = root.outgoingUpdates ?? [];
      root.outgoingUpdates.push({ path: "abc", value: Math.random(), confirmed: 1 });
      refreshData();
    });
  }
}

setupGamePlayer();

export { root, socketClient };
