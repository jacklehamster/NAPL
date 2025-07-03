export enum Behavior {
  CONTROL = "control",
}

export interface Element {
  type: string;
  x: number;
  y: number;
  dx: number;
  dy: number;
  speed: number;
  dirX?: number;
  dirY?: number;
  expiration: number;
  ko?: number;
  behavior?: Behavior;
  slowdown?: number;
  [key: string]: any;
}

export interface WorldContext {
  world?: {
    elements: Element[];
    lastFoe: number;
    gameOver?: boolean;
    size: { width: number; height: number };
  };
}
