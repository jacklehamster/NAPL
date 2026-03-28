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
