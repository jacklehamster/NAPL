import type ws from "ws";
import { SyncRoom } from "./SyncRoom";

export class SyncSocket {
  readonly #rooms: Record<string, SyncRoom> = {};

  constructor(server: ws.Server<any>) {
    this.#hookupSocketServer(server);
  }

  #hookupSocketServer(server: ws.Server) {
    server.on("connection", (socket: ws.WebSocket, req) => {
      //  extract query params
      const parameters: URLSearchParams = new URLSearchParams(req.url?.split("?")[1]);
      const room = parameters.get("room") ?? "default";
      console.log("client connected", parameters, " room", room);
      if (!this.#rooms[room]) {
        this.#rooms[room] = new SyncRoom(room);
        let timeout: Timer;
        this.#rooms[room].addRoomChangeListener((roomState) => {
          if (Object.values(roomState.clients).length) {
            clearTimeout(timeout);
          } else {
            //  close room if no clients
            timeout = setTimeout(() => {
              console.log("closing room", room);
              delete this.#rooms[room];
            }, 10000);
          }
        });
      }
      this.#rooms[room].welcomeClient(socket);
    });
  }
}
