export function WorkerMessageListener<C>() {
  const cleanups = new Set<() => void>();
  function onMessage(listener: (msg: C) => void) {
    const wrappedListener = ({ data }: MessageEvent<C>) => listener(data);
    self.addEventListener("message", wrappedListener);
    return () => {
      self.removeEventListener("message", wrappedListener);
    };
  }

  return {
    addWorkerMessageListener(messageListener: (msg: C) => void) {
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
