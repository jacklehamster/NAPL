export type WorkerResponse =
  | { action: "ping"; now: number; data?: undefined }
  | {
      action: "send";
      data: Uint8Array;
      peer: string | undefined;
    }
  | ({ data?: undefined } & (
      | { action: "close" }
      | { action: "enterRoom"; room: string; host: string }
      | { action: "exitRoom"; room: string; host: string }
    ));
