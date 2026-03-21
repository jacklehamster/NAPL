export function HookListener<C extends (...args: any) => any>({
  onListener,
  listener,
  selfRemove,
}: {
  onListener: (callback: C) => () => void;
  listener: C;
  selfRemove?: boolean;
}) {
  const listenerRegistered: C = selfRemove
    ? (((...data: Parameters<C>): ReturnType<C> => {
        const result = listener(...data);
        removeListener();
        return result;
      }) as C)
    : listener;

  const removeListener = onListener(listenerRegistered);
  return {
    stop() {
      removeListener();
    },
  };
}
