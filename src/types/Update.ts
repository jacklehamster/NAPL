export interface Update {
  path: string;
  value?: any | ArrayBuffer;
  append?: boolean;
  insert?: number;
  delete?: number;
  confirmed?: number;
  peer?: string;
}
