export interface Update {
  sender?: string;
  timestamp?: number;
  confirmed?: boolean;
  path: (string | number)[] | string;
  value?: any;
  deleted?: boolean;
}
