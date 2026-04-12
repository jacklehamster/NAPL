import { deploy, Initializer, Space, Val } from "../core/Space";

const PathUtil: Initializer = () => {
  return {
    getPath(space: Space, currentDepth: number) {
      const ComponentName = space.initializer?.name ?? null;
      const id = space.id ?? ComponentName;
      if (!id) return undefined;
      const diff = currentDepth - space.depth;
      return new Array(diff).fill(".") + id;
    },
  };
};

const ExportUtil: Initializer<{
  getPath: Val<(space: Space, depth: number) => string>;
}> = ({ getPath }) => {
  function _exportHelper(
    space: Space,
    includeReturnValues: boolean = false,
    returnSpaces: Map<Space, Record<string, any>> = new Map(),
    scope: Record<string, Space> = {},
    propsToCleanup: Set<Record<string, any>> = new Set(),
  ) {
    returnSpaces.set(
      space,
      Object.fromEntries(
        Object.entries(space.result).map(([key, value]) => {
          return [key, value.val];
        }),
      ),
    );
    const ComponentName = space.initializer?.name ?? null;
    const title = space.id ? `${space.id}:${ComponentName}` : ComponentName;

    const propEntries = Object.entries(space.props ?? {});
    const props = Object.fromEntries(
      propEntries.map(([key, val]) => {
        if (val.space) {
          const returnSpace = returnSpaces.get(val.space);
          returnSpace![val.id] = val.val;
        }
        const debugValue = includeReturnValues ? ` = ${val.val}` : "";
        const value = !val.space
          ? val.val
          : val.space.id && scope[val.space.id] === val.space
            ? `~${val.space.id}.${val.id}${debugValue}`
            : val.space.initializer?.name &&
                scope[val.space.initializer.name] === val.space
              ? `~${val.space.initializer.name}.${val.id}${debugValue}`
              : `~${getPath.val(val.space, space.depth)}.${val.id}${debugValue}`;
        return [key, value];
      }),
    );

    if (space.initializer?.name) {
      scope[space.initializer.name] = space;
    }
    if (space.id) {
      scope[space.id] = space;
    }
    const content: any[] = space.content.map((space) => {
      if (space.initializer?.name) {
        scope[space.initializer.name] = space;
      }
      if (space.id) {
        scope[space.id] = space;
      }
      return _exportHelper(
        space,
        includeReturnValues,
        returnSpaces,
        { ...scope },
        propsToCleanup,
      );
    });
    const totalProps = {
      ...props,
      ...(includeReturnValues ? { returned: returnSpaces.get(space) } : {}),
    };
    propsToCleanup.add(totalProps);
    return content.length
      ? [title, totalProps, content]
      : Object.entries(totalProps).length
        ? [title, totalProps]
        : [title];
  }

  return {
    exportSpace(space: Space, includeReturnValues: boolean = false) {
      const propsToCleanup = new Set<Record<string, any>>();
      const result = _exportHelper(
        space,
        includeReturnValues,
        new Map(),
        {},
        propsToCleanup,
      );
      propsToCleanup.forEach((props) => {
        if (
          typeof props.returned === "object" &&
          !Object.keys(props.returned).length
        ) {
          delete props.returned;
        }
      });
      return result;
    },
  };
};

const {
  result: {
    exportSpace: { val: exportSpace },
  },
} = deploy(PathUtil, {}, ({ result: { getPath } }) => {
  const {
    result: { exportSpace },
  } = deploy(ExportUtil, { getPath });
  return { exportSpace };
});

export { exportSpace };
