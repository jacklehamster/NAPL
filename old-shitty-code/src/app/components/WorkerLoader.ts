export const WorkerLoader = (config: { programWorkerUrl: URL }) => {
  const worker = new Worker(config.programWorkerUrl, { type: "module" });
  return {
    worker,
    stop: () => {
      worker.terminate();
    },
  };
};
