import { Data } from "@/napl";

export interface Task<D extends Data = Record<string, any>> {
  type: string;
  details?: D;
  description: string;
}

export class Peng {
  active = true;
  tasks: Task[] = [];
  currentTaskIndex: number = 0;

  setTasks(tasks: Task[]) {
    this.currentTaskIndex = 0;
    this.tasks = tasks;
    return this;
  }

  get currentTask() {
    return this.tasks[this.currentTaskIndex];
  }

  static create() {
    return new Peng();
  }
}
