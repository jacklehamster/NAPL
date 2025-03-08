import { Project } from "@/model/Project";
import { FixedFramerateLoop } from "fixed-framerate-loop";
import { Component } from "./Component";
import { processProject } from "./ProjectProcessor";
import { DEFAULT_COMPONENTS } from "./DefaultComponents";

export function executeProject(project: Project, components: Record<string, Component> = DEFAULT_COMPONENTS) {
  const projectComponents = { ...DEFAULT_COMPONENTS, ...components };

  const loopCyclesPerScene = processProject(project, projectComponents);

  const looper = new FixedFramerateLoop();

  const stop = looper.startLoop((time, render) => {
    loopCyclesPerScene[project.sceneIndex]?.forEach(({ component, code }) => {
      component.loop?.(code, project, time, render);
    });
  });
  return { project, stop };
}
