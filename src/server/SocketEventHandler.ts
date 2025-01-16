import ws from "ws";
import { Payload } from "./SocketPayload";
import { extractPayload } from "@dobuki/data-blob";


export function addMessageReceiver(socket: ws.WebSocket, payloadReceived: (payload: Payload, blobs: Record<string, Blob>) => void) {
  socket.on("message", async (message: Blob) => {
    if (message instanceof Buffer) {
      const blob = new Blob([message]);
      const { payload, ...blobs } = await extractPayload(blob);
      if (payload) {
        payloadReceived(payload, blobs);
      }
    }
  });
}
