import { Project } from "@/model/Project";
import { Code } from "../model/Code";

export interface Component {
  init?(code: Code, project: Project | undefined): void;
  loop?(code: Code, project: Project, delta: number, render: boolean): void;
}
