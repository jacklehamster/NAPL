export interface Update {
  path: (string | number)[] | string;
  value?: any;
  push?: boolean;
  insert?: number;
  confirmed?: number;
  deleted?: boolean;
}
