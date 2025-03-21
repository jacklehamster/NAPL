export interface Update {
  path: string;
  value?: any | Blob;
  append?: boolean;
  insert?: number;
  delete?: number;
  confirmed?: number;
}
