import type ws from "ws";
import { DataObject } from "@/types/DataObject";
import { Update } from "@/types/Update";
import { addMessageReceiver } from "./SocketEventHandler";
import { commitUpdates } from "@/data-update";
import type { UUID } from "crypto";
import { Payload } from "./SocketPayload";

/**
 * Data format:
 * 
 * Client message
 * {
 *  updates: [
 *   [key: string, value: any]
 *  ],
 */

interface ClientState {
  owner: UUID;
}

interface ServerState {
  clients: Record<number, ClientState>;
}

export class SyncSocket {
  readonly #sockets: Map<ws.WebSocket, ClientState> = new Map();
  readonly #state: DataObject & ServerState = {
    clients: {},
  };
  #updates: Update[] = [];

  constructor(server: ws.Server<any>) {
    this.#hookupSocketServer(server);
  }

  shareUpdates(newUpdates: Update[], sender?: ws.WebSocket) {
    const unconfirmedUpdates = newUpdates.filter(update => !update.confirmed);
    this.#confirmUpdatesWithoutOwner(newUpdates);
    this.#pushUpdates(newUpdates);
    this.#updates = commitUpdates(this.#state, Object.values(this.#updates));
    this.#broadcastUpdates(newUpdates, client => client !== sender);
    this.#broadcastUpdates(unconfirmedUpdates, client => client === sender);
  }

  #pushUpdates(newUpdates: Update[] | undefined) {
    if (newUpdates) {
      newUpdates.forEach((update) => {
        const path = Array.isArray(update.path) ? update.path.join("/") : update.path;
        this.#updates.push(update);
      });
    }
  }

  #broadcastUpdates(newUpdates: Update[] | undefined, senderFilter?: (sender: ws.WebSocket) => boolean) {
    if (!newUpdates?.length) {
      return;
    }
    const payload = JSON.stringify({
      updates: newUpdates,
    });
    this.#sockets.keys().forEach((client) => {
      if (senderFilter && !senderFilter(client)) {
        return;
      }
      client.send(payload);
    });
  }

  #confirmUpdatesWithoutOwner(updates: Update[]) {
    updates.forEach((update) => {
      const parts = Array.isArray(update.path) ? update.path : update.path.split("/");
      if (parts[0] !== "clients") {
        update.confirmed = true;
      }
    });
  }

  #hookupSocketServer(server: ws.Server) {
    server.on("connection", (socket: ws.WebSocket, req) => {
      //  extract query params
      const parameters = new URLSearchParams(req.url?.split("?")[1]);
      console.log("client connected", parameters);

      //  initialize client state
      const clientId = crypto.randomUUID();
      const clientState: ClientState = {
        owner: clientId,
      };
      this.#sockets.set(socket, clientState);
      const newUpdates = [
        {
          path: ["clients", clientId],
          value: clientState,
          confirmed: true,
        }
      ];
      this.shareUpdates(newUpdates, socket);

      //  setup events
      addMessageReceiver(socket, {
        payloadReceived: (payload) => {
          if (payload.updates) {
            this.shareUpdates(payload.updates, socket);
          }
        },
      });

      socket.on("close", () => {
        this.#sockets.delete(socket);
        this.shareUpdates([
          {
            path: ["clients", clientId],
            deleted: true,
            confirmed: true,
          },
        ]);
        console.log(`client ${clientId} disconnected`);
      });

      this.#updates = commitUpdates(this.#state, this.#updates);

      //  update client just connected with state and updates
      const clientPayload: Payload = {
        myClientId: clientId,
        state: this.#state,
        updates: this.#updates,
      };
      socket.send(JSON.stringify(clientPayload));
    });
  }
}
