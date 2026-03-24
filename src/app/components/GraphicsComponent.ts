import { setupGraphics } from "../core/graphics";

export function GraphicsComponent({
  worker,
  root,
}: {
  worker: Worker;
  root?: HTMLElement;
}) {
  const { unhook: unhookGraphics } = setupGraphics(worker, root);
  return {
    stop() {
      unhookGraphics();
    },
  };
}
