import type { Server } from "ws";
import { SyncSocket } from "./server/SyncSocket";
export * from "./data-update";
export * from "./server/SocketPayload";
export * from "./client/SocketClient";

export function attachSyncSocket(server: Server<any>) {
  return new SyncSocket(server);
}
