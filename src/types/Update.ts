
export interface Update {
  path: string;
  value?: any;
  append?: boolean;
  insert?: number;
  delete?: number;
  confirmed?: number;
}
