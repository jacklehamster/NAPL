type Callback = (...params: any[]) => void;

const nextFrameInProgress: Set<Callback> = new Set();

export function prepareNextFrame(callback: (...params: any[]) => void, ...params: any[]): void {
  if (nextFrameInProgress.has(callback)) {
    return;
  }
  nextFrameInProgress.add(callback);
  requestAnimationFrame(() => {
    nextFrameInProgress.delete(callback);
    callback(...params);
  });
}

export function executeFrame(callback: (...params: any[]) => void, ...params: any[]): void {
  nextFrameInProgress.delete(callback);
  callback(...params);
}
