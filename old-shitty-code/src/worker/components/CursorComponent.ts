import { generateRandomHexColor } from "../../app/utils/drawing";

export type Cursor = {
  x: number;
  y: number;
  needsReset: boolean;
  color: string;
  width: number;
};

export function CursorComponent({}: {}) {
  const cursor = {
    x: 0,
    y: 0,
    needsReset: true,
    color: "black",
    width: 1,
  };

  return {
    cursor,
    reset() {
      cursor.needsReset = true;
      cursor.color = generateRandomHexColor();
    },
  };
}
