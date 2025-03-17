
export interface Update {
  path: string;
  value?: any | undefined;
  append?: boolean;
  insert?: number;
  delete?: number;
  confirmed?: number;
  processed?: boolean;
  blobs?: { [key: string]: Blob };
  signature?: string;
}
