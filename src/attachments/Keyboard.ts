import { Program } from "@/core/Program";
import { Attachment } from "./Attachment";

export interface Config {
  path?: string;
  keys: [string[], string[]][];
}

export class Keyboard implements Attachment {
  readonly keymapping: Record<string, string[]> = {};
  onDetach?: () => void;

  constructor(public config: Config) {
    config.keys.forEach(([ks, as]) => {
      ks.forEach(k => {
        this.keymapping[k] = as;
      });
    });
  }

  private setupListeners(program: Program, path: string) {
    const keys = this.keymapping;
    const onPress = (e: KeyboardEvent) => {
      keys[e.code]?.forEach(a => {
        program.setData(`${path}/${a}`, (val?: number) => !val ? program.now : val);
      });
    };
    const onRelease = (e: KeyboardEvent) => {
      keys[e.code]?.forEach(a => {
        program.setData(`${path}/${a}`, undefined);
      });
    };
    document.addEventListener("keydown", onPress);
    document.addEventListener("keyup", onRelease);
    return () => {
      document.removeEventListener("keydown", onPress);
      document.removeEventListener("keyup", onRelease);
    }
  }

  onAttach(program: Program) {
    this.onDetach = this.setupListeners(program, this.config.path ?? "keys");
  }
}
