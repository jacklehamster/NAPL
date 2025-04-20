// To recognize dom types (see https://bun.sh/docs/typescript#dom-types):
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

import { displayUsers, provideSocketClient } from "@dobuki/syncopath";
import { createContext, Data, Processor } from "napl";

const root: Data = {
};
const context = createContext(root)


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
  div2.textContent = JSON.stringify(context.outgoingUpdates, null, 2);
}

const socketClient = provideSocketClient({ host: location.host }, root);

displayUsers(socketClient);

const processor = new Processor(blob => {
  console.log("Updates sent out", blob);
});
processor.observe().onChange(refreshData);

function cycle() {
  processor.performCycle(context);
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
      context.outgoingUpdates = context.outgoingUpdates ?? [];
      context.outgoingUpdates.push({ path: "abc", value: Math.random(), confirmed: 1 });
      refreshData();
    });
  }
}

setupGamePlayer();

export { root, socketClient };
