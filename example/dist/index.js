// ../node_modules/fixed-framerate-loop/dist/index.js
var G = 1000;
var j = 16.5;
var H = 10;

class l {
  requestAnimationFrame;
  cancelAnimationFrame;
  maxLoopJump;
  constructor({ requestAnimationFrame: d = globalThis.requestAnimationFrame.bind(globalThis), cancelAnimationFrame: b = globalThis.cancelAnimationFrame.bind(globalThis) } = {}, { maxLoopJump: c = H } = {}) {
    this.requestAnimationFrame = d, this.cancelAnimationFrame = b, this.maxLoopJump = c;
  }
  startLoop(d, b = {}) {
    const c = b.frameDuration ?? (b.frameRate ? G / b.frameRate : undefined) ?? j;
    let R = 0;
    function w(k, r) {
      if (k > r)
        return R -= c * (k - r), r;
      return k;
    }
    const { maxLoopJump: z, requestAnimationFrame: y, cancelAnimationFrame: E } = this;
    let f = 0;
    const B = (k) => {
      I = y(B);
      const r = w(Math.round((k + R - f) / c), z);
      for (let v = 0;v < r; v++)
        f += c, d(f, v === r - 1);
    };
    let I = y(B);
    return () => {
      E(I);
    };
  }
}

// ../src/core/Registry.ts
var SAVED_MODULES = {};
async function importAndRegister({ name, modulePath }, components) {
  try {
    const module = SAVED_MODULES[modulePath] ?? (SAVED_MODULES[modulePath] = await import(modulePath));
    const component = module[name] ?? module.default;
    components[name] = component;
  } catch (error) {
    console.error(`Failed to import module ${modulePath}:`, error);
  }
}

// ../src/core/ProjectProcessor.ts
function processProject(project, components) {
  const loopCyclesPerScene = [];
  const newComponents = { ...components };
  processRegistry(project.registry, newComponents);
  project.scenes.forEach((scene, index) => processCode(scene, newComponents, project, loopCyclesPerScene[index] = []));
  return loopCyclesPerScene;
}
function processRegistry(registryConfig, components) {
  registryConfig?.forEach((config) => importAndRegister(config, components));
}
function processCode(code, components, project, loopCycles) {
  if (Array.isArray(code)) {
    code.forEach((item) => processCode(item, components, project, loopCycles));
    return;
  }
  const newComponents = { ...components };
  processRegistry(code.registry, newComponents);
  if (code.type) {
    newComponents[code.type]?.init?.(code, project);
    if (newComponents[code.type]?.loop) {
      loopCycles.push({ component: newComponents[code.type], code });
    }
  }
  for (let key in code) {
    if (code[key] instanceof Object) {
      processCode(code[key], newComponents, project, loopCycles);
    }
  }
}

// ../src/core/DefaultComponents.ts
var DEFAULT_COMPONENTS = {};

// ../src/core/ProjectLoader.ts
function executeProject(project, components = DEFAULT_COMPONENTS) {
  const projectComponents = { ...DEFAULT_COMPONENTS, ...components };
  const loopCyclesPerScene = processProject(project, projectComponents);
  const looper = new l;
  const stop = looper.startLoop((time, render) => {
    loopCyclesPerScene[project.sceneIndex]?.forEach(({ component, code }) => {
      component.loop?.(code, project, time, render);
    });
  });
  return { project, stop };
}
// src/index.ts
var { project, stop } = executeProject({
  scenes: [
    {
      loopTest: {
        type: "LoopTest"
      }
    },
    {
      loopTest2: {
        type: "LoopTest"
      }
    }
  ],
  sceneIndex: 0
}, {
  LoopTest: {
    init: (code, project2) => {
      const button = document.body.appendChild(document.createElement("button"));
      button.textContent = ">>";
      button.onclick = () => {
        project2.sceneIndex = (project2.sceneIndex + 1) % project2.scenes.length;
      };
    },
    loop: (code, project2, delta, render) => {
      code.test = (code.test || 0) + 1;
    }
  }
});
var div = document.body.appendChild(document.createElement("div"));
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

//# debugId=C44AC4CA2567CE1564756E2164756E21
