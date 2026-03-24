export function setupGraphics(worker: Worker, root?: HTMLElement) {
  const container = root ?? document.body;
  const canvas = container.appendChild(document.createElement("canvas"));
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  const width = canvas.offsetWidth;
  const height = canvas.offsetHeight;
  const offscreen = canvas.transferControlToOffscreen();
  worker.postMessage(
    { canvas: offscreen, width, height, dpr: window.devicePixelRatio },
    [offscreen],
  );

  function sendSize() {
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const width = Math.max(1, Math.floor(rect.width));
    const height = Math.max(1, Math.floor(rect.height));
    worker.postMessage({ type: "resize", width, height, dpr });
  }

  const observer = new ResizeObserver(sendSize);
  observer.observe(canvas);
  window.addEventListener("resize", sendSize);

  function unhook() {
    window.removeEventListener("resize", sendSize);
    observer.unobserve(canvas);
    observer.disconnect();
    canvas.parentElement?.removeChild(canvas);
  }

  return { unhook };
}
