import { Code } from "./Code";
import { RegistryConfig } from "./RegistryConfig";

export interface Project {
  registry?: RegistryConfig[];
  scenes: Code[];
  sceneIndex: number;
}
