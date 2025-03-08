// To recognize dom types (see https://bun.sh/docs/typescript#dom-types):
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

import { executeProject } from "napl";

const { project, stop } = executeProject({
  scenes: [
    {
      loopTest: {
        type: "LoopTest",
      },
    },
    {
      loopTest2: {
        type: "LoopTest",
      },
    },
  ],
  sceneIndex: 0
}, {
  LoopTest: {
    init: (code, project) => {
      const button = document.body.appendChild(document.createElement("button"));
      button.textContent = ">>";
      button.onclick = () => {
        project.sceneIndex = (project.sceneIndex + 1) % project.scenes.length;
      }
    },
    loop: (code, project, delta, render) => {
      code.test = (code.test || 0) + 1;
    },
  }
});

const div = document.body.appendChild(document.createElement("div"));
div.style.whiteSpace = "pre";
div.style.fontFamily = "monospace";
div.style.fontSize = "12px";

function loop() {
  div.textContent = JSON.stringify(project.scenes[project.sceneIndex], null, 2);
}
requestAnimationFrame(function raf(time) {
  loop();
  requestAnimationFrame(raf);
});
