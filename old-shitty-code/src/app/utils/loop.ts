import { WRITE } from "../core/messenger";

export function processLoop(
  ctrl: Int32Array,
  callback: () => void,
): () => void {
  let lastWrite = Atomics.load(ctrl, WRITE);

  async function tick() {
    // sleep until WRITE changes
    const result = Atomics.waitAsync(ctrl, WRITE, lastWrite, 16);
    await result.value;
    // await new Promise((resolve) => setTimeout(resolve));
    const writeNow = Atomics.load(ctrl, WRITE);
    if (writeNow === lastWrite) return;
    lastWrite = writeNow;

    callback();
  }
  let looping = true;
  async function start() {
    while (looping) {
      await tick();
    }
  }
  start();
  return () => {
    looping = false;
  };
}
