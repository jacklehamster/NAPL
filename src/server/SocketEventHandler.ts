import ws from "ws";
import { Payload } from "./SocketPayload";

//  setup events
async function transformMessage(data: any): Promise<Payload | null> {
  let message: any;

  if (data instanceof Buffer) {
    message = (data.toString());
  } else if (data instanceof ArrayBuffer) {
    message = (Buffer.from(data).toString());
  } else if (data instanceof Blob) {
    const text = await data.text();
    message = (text);
  } else {
    throw new Error("Unsupported data type");
  }
  try {
    return JSON.parse(message);
  } catch (e) {
    console.log(e);
    return null;
  }
}

export function addMessageReceiver(socket: ws.WebSocket, {
  payloadReceived,
}: {
  payloadReceived: (payload: Payload) => void,
}) {
  socket.on("message", async (message: any) => {
    const payload: Payload | null = await transformMessage(message);
    if (payload) {
      payloadReceived(payload);
    }
  });
}
