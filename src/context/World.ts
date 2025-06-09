export interface Element {
  type: string;
  x: number;
  y: number;
  dx: number;
  dy: number;
  dirX?: number;
  dirY?: number;
  [key: string]: any;
}

export interface WorldContext {
  world?: {
    elements: Element[];
    lastFoe: number;
  };
}
