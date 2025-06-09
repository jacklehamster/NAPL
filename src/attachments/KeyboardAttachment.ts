import { Program } from "@/core/Program";
import { Attachment } from "./Attachment";

interface Config {
  path?: string;
  keymapping: Record<string, string>;
}

export class KeyboardAttachment implements Attachment {
  constructor(public config: Config) {
  }

  setupListeners(program: Program, path: string) {
    const keys = this.config.keymapping;
    const onPress = (e: KeyboardEvent) => {
      if (keys[e.code]) {
        program.setData(`${path}/${keys[e.code]}`, (val?: number) => !val ? program.now : val);
      }
    };
    const onRelease = (e: KeyboardEvent) => {
      if (keys[e.code]) {
        program.setData(`${path}/${keys[e.code]}`, undefined);
      }
    };
    document.addEventListener("keydown", onPress);
    document.addEventListener("keyup", onRelease);
    return () => {
      document.removeEventListener("keydown", onPress);
      document.removeEventListener("keyup", onRelease);
    }
  }

  onAttach(program: Program) {
    return this.setupListeners(program, this.config.path ?? "keys");
  }
}
