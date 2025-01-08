import type ws from "ws";
import { SyncRoom } from "./SyncRoom";

export class SyncSocket {
  readonly #rooms: Record<string, SyncRoom> = {};

  constructor(server: ws.Server<any>) {
    this.#hookupSocketServer(server);
  }

  #hookupSocketServer(websocketServer: ws.Server) {
    websocketServer.on("listening", () => {
      const address = websocketServer.address();
      if (typeof address === "string") {
        console.log(`WebSocket server listening on ${address}`);
      } else if (address && typeof address === "object") {
        const host = address.address === '::' ? 'localhost' : address.address;
        console.log(`WebSocket server listening on ws://${host}:${address.port}`);
      }
    });

    websocketServer.on("connection", (socket: ws.WebSocket, req) => {
      //  extract query params
      const parameters = new URLSearchParams(req.url?.split("?")[1]);
      const roomName = parameters.get("room") ?? "default";
      const room = this.#getRoom(roomName);
      const { clientId } = room.welcomeClient(socket);
      console.log(`client ${clientId} connected in room ${roomName}.`);
    });
  }

  #getRoom(room: string) {
    if (!this.#rooms[room]) {
      this.#rooms[room] = new SyncRoom(room);
      this.#rooms[room].addRoomChangeListener((roomState) => {
        //  close room after 10s if no clients
        setTimeout(() => {
          if (!Object.values(roomState.clients).length) {
            console.log("closing room", room);
            delete this.#rooms[room];
          }
        }, 10000);
      });
    }
    return this.#rooms[room];
  }
}
