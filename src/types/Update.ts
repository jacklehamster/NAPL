export interface Update {
  path: (string | number)[] | string;
  value?: any;
  confirmed?: number;
  deleted?: boolean;
}
