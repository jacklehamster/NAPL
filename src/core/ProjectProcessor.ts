import { Code } from "../model/Code";
import { Project } from "../model/Project";
import { RegistryConfig } from "../model/RegistryConfig";
import { LoopCycle } from "./LoopCycle";
import { Components, importAndRegister } from "./Registry";

export function processProject(project: Project, components: Components) {
  const loopCyclesPerScene: LoopCycle[][] = [];
  const newComponents = { ...components };
  processRegistry(project.registry, newComponents);
  project.scenes.forEach((scene, index) => processCode(scene, newComponents, project, loopCyclesPerScene[index] = []));
  return loopCyclesPerScene;
}

function processRegistry(registryConfig: RegistryConfig[] | undefined, components: Components): void {
  registryConfig?.forEach((config) => importAndRegister(config, components));
}

function processCode(code: Code | Code[], components: Components, project: Project, loopCycles: LoopCycle[]): void {
  if (Array.isArray(code)) {
    code.forEach((item) => processCode(item, components, project, loopCycles));
    return;
  }
  const newComponents = { ...components };
  //  registry
  processRegistry(code.registry, newComponents);
  //  type
  if (code.type) {
    newComponents[code.type]?.init?.(code, project);
    if (newComponents[code.type]?.loop) {
      loopCycles.push({ component: newComponents[code.type], code });
    }
  }
  //  process all children
  for (let key in code) {
    if (code[key] instanceof Object) {
      processCode(code[key], newComponents, project, loopCycles);
    }
  }
}
