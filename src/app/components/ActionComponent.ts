import { Message } from "../MessageType";
import { Stoppable, Component } from "./Component";
type Actionable = { execute(msg: Message): void } & Stoppable;

export type ActionComponent<
  P extends Record<string, unknown>,
  R extends Actionable = Actionable,
> = Component<P, R>;

export function Action(callback: (msg: Message) => void) {
  return (): Actionable => {
    return {
      execute(msg: Message) {
        callback(msg);
      },
    };
  };
}
