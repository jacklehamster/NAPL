// workspace.ts

export type Stoppable = { stop?(): void };

/**
 * Component:
 * - P = props object type (optional)
 * - A = args tuple type (rest params)
 *
 * No `any` — uses `unknown`.
 */
export type Component<
  P extends Record<string, unknown>,
  R extends Stoppable = Stoppable,
> = (props: P) => R;

type PropsOf<C> = C extends (props: infer P) => any ? P : never;

type Hook = <C extends Component<any, any>>(
  component: C,
  props: PropsOf<C>,
  callback?: (result: ReturnType<C> & { hook: Hook }) => (() => void) | void,
) => ReturnType<C> & { unhook: () => void };

const hook: Hook = (component, props, callback) => {
  const result = component(props);
  const unhooks = new Set<() => void>();
  const disposeCallback = callback?.({
    ...result,
    hook<C extends Component<any, any>>(
      component: C,
      props: PropsOf<C>,
      callback?: (result: ReturnType<C> & { hook: Hook }) => void,
    ) {
      const { unhook } = hook(component, props, callback);
      if (unhook) {
        unhooks.add(unhook);
      }
    },
  });

  return {
    ...result,
    unhook: () => {
      unhooks.forEach((unhook) => unhook());
      (result as Stoppable).stop?.();
      disposeCallback?.();
    },
  };
};

export function Workspace() {
  return {
    stop() {},
  };
}

export function workspace(callback: (props: { hook: Hook }) => void) {
  return hook(Workspace, {}, callback);
}
