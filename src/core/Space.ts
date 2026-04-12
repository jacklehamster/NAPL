/**
 * A space is a component providing capabilities for the app.
 * Actors can use the space to perform operations, but the space cannot operate on its own.
 * - A Space instance can contain other sub-Spaces instances when declared.
 * - A Space can expose its properties / abilities via return value.
 * - A Space takes required or optional dependencies from:
 *      - Adjacent spaces.
 *      - Parent spaces.
 *
 * To define a Space, we create a Space function which takes:
 * - dependencies
 * - content callback
 *
 * Dependencies are properties that the Space needs, always an object.
 * Content callback is a function, in which more Spaces can be instanciated.
 */

import { makeResults } from "../utils/var-utils";

export interface Val<T> {
  id: string;
  space: Space | null;
  val: T;
  listeners: Array<(value: Val<T>, old?: T) => void>;
}
export type Vals = Record<string, Val<any>>;
export type Props = Record<
  string,
  Val<any> | boolean | string | number | Function | null
>;

export type Initializer<R extends Vals = {}> = (
  dependencies: R,
) => Props | void;

export interface Space {
  id?: string;
  depth: number;
  props?: Vals;
  readonly result: Vals;
  initializer?: Initializer<any>;
  readonly content: Space[];
}

interface Context {
  space: Space;
}

let globalContext: Context = {
  space: {
    depth: 0,
    props: {},
    result: {},
    initializer: () => {},
    content: [],
  },
};

export function deploy<R extends Vals>(
  initializer: Initializer<R> | null,
  props?: Props | null,
  content?: (space: Space) => Record<string, any> | void,
  passedContext?: Context,
): Space {
  const context = passedContext ?? globalContext;
  const spaceId = props?.id ? `${props.id}` : undefined;
  const space: Space = {
    id: spaceId,
    depth: context.space.depth + 1,
    result: {},
    initializer: initializer ?? undefined,
    content: [],
  };
  const propsAsResults = makeResults(props ?? {}, null);
  space.props = propsAsResults;
  Object.entries(
    makeResults(initializer?.(propsAsResults as R) ?? {}, space),
  ).forEach(([key, val]) => (space.result[key] = val));
  context.space.content.push(space);

  if (!content) {
    return space;
  }

  const parentContext = context;
  globalContext = { space };
  const returnValues = content(space);
  globalContext = parentContext;
  if (returnValues) {
    Object.entries(makeResults(returnValues, space) ?? {}).forEach(
      ([key, value]) => (space.result[key] = value),
    );
  }
  return space;
}
