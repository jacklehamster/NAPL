import ws from "ws";
import { Payload } from "./SocketPayload";
import { extractPayload } from "@dobuki/data-blob";


export function addMessageReceiver(socket: ws.WebSocket, {
  payloadReceived,
}: {
  payloadReceived: (payload: Payload) => void,
}) {
  socket.on("message", async (message: Blob) => {
    if (message instanceof Buffer) {
      const blob = new Blob([message]);
      const result = await extractPayload(blob);
      if (result[0]) {
        payloadReceived(result[0]);
      }
    }
  });
}
