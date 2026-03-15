export function WorkerMessageListener<C>() {
  const cleanups = new Set<() => void>();
  function onMessage(listener: (e: MessageEvent<C>) => void) {
    self.addEventListener("message", listener);
    return () => {
      self.removeEventListener("message", listener);
    };
  }

  return {
    addWorkerMessageListener(messageListener: (e: MessageEvent<C>) => void) {
      const removeListener = onMessage(messageListener);
      cleanups.add(removeListener);
      return () => {
        removeListener();
        cleanups.delete(removeListener);
      };
    },
    stop() {
      cleanups.forEach((cleanup) => cleanup());
    },
  };
}
