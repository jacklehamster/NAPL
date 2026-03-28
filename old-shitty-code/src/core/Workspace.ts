import { Component } from "../app/components/Component";

type PropsOf<C> = C extends (props: infer P) => any ? P : never;

export type Hook = <C extends Component<any, any>>(
  component: C,
  props?: PropsOf<C>,
  callback?: (result: ReturnType<C> & { hook: Hook }) => (() => void) | void,
) => ReturnType<C> & { unhook: () => void };

export function workspace(callback: (props: { hook: Hook }) => void) {
  const cleanup = new Set<() => void>();
  const hook: Hook = (component, props, callback) => {
    const result = component(props) ?? {};
    const { stop, onActive } = result;
    let disposeCallback: (() => void) | void;
    if (!onActive) {
      disposeCallback = callback?.(result);
    } else {
      onActive(() => {
        disposeCallback = callback?.(result);
      });
    }
    cleanup.add(() => {
      disposeCallback?.();
      stop?.();
    });
    return result;
  };
  callback({ hook });
  return () => {
    cleanup.forEach((clean) => clean());
    cleanup.clear();
  };
}
