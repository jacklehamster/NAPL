export function HookListener<C extends Function>({
  onListener,
  listener,
}: {
  onListener: (callback: C) => () => void;
  listener: C;
}) {
  const removeListener = onListener(listener);
  return {
    stop() {
      removeListener();
    },
  };
}
