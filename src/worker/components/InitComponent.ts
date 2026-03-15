import { initialize } from "../CommInterface.worker";

export function InitComponent() {
  const { getCanvas } = initialize();

  return {
    getCanvas,
    stop() {
      close();
    },
  };
}
