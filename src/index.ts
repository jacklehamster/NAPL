import type ws from "ws";
import { SyncSocket } from "./server/SyncSocket";
export * from "./data-update";
export * from "./server/SocketPayload";
export * from "./client/SocketClient";

export function attachSyncSocket(server: ws.Server<any>) {
  return new SyncSocket(server);
}
