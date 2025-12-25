import { Connection } from "@/connections/Connection";
import { Program } from "./Program";

export class Sample {
  program = new Program();
  main(): Connection {
    const cycle = this.program.start();

    return {
      disconnect() {
        cycle.disconnect();
      }
    }
  }
}
