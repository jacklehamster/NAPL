export type WorkerCommand =
  | {
      type: "onUserUpdate";
      user: string;
      action: "join" | "leave";
      users: string[];
      data?: undefined;
    }
  | { type: "onMessage"; data: any; from: string }
  | { type: "createApp"; userId: string; appId: string; data?: undefined }
  | {
      type: "ping";
      now: number;
      data?: undefined;
    }
  | {
      type: "resize";
      width: number;
      height: number;
      dpr?: number;
    };
