import { setupGraphics } from "../core/graphics";

export function GraphicsComponent({ worker }: { worker: Worker }) {
  const { unhook: unhookGraphics } = setupGraphics(worker);
  return {
    stop() {
      unhookGraphics();
    },
  };
}
