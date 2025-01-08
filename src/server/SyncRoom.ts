import { commitUpdates } from "@/data-update";
import { Update } from "@/types/Update";
import ws from "ws";
import { addMessageReceiver } from "./SocketEventHandler";
import { Payload } from "./SocketPayload";
import { ClientState } from "@/types/ClientState";
import { RoomState } from "@/types/ServerState";

export class SyncRoom {
  readonly #sockets: Map<ws.WebSocket, ClientState> = new Map();
  readonly #state: RoomState;
  #updates: Update[] = [];
  #onRoomChange: Set<(roomState: RoomState) => void> = new Set();

  constructor(readonly room: string) {
    this.#state = {
      clients: {},
    };
  }

  addRoomChangeListener(callback: (roomState: RoomState) => void) {
    this.#onRoomChange.add(callback);
  }

  welcomeClient(client: ws.WebSocket) {
    //  initialize client state
    const clientId = crypto.randomUUID();
    const clientState: ClientState = {
    };
    this.#sockets.set(client, clientState);
    const newUpdates: Update[] = [
      {
        path: ["clients", clientId],
        value: clientState,
        confirmed: Date.now(),
      }
    ];
    this.shareUpdates(newUpdates, client);

    //  setup events
    addMessageReceiver(client, {
      payloadReceived: (payload) => {
        if (payload.updates) {
          this.shareUpdates(payload.updates, client);
        }
      },
    });

    client.on("close", () => {
      this.#sockets.delete(client);
      this.shareUpdates([
        {
          path: ["clients", clientId],
          deleted: true,
          confirmed: Date.now(),
        },
      ]);
      console.log(`client ${clientId} disconnected`);
      this.#onRoomChange.forEach((callback) => callback(this.#state));
    });

    commitUpdates(this.#state, this.#updates);
    this.#updates = this.#updates.filter(update => !update.confirmed)

    //  update client just connected with state and updates
    const clientPayload: Payload = {
      myClientId: clientId,
      state: this.#state,
      updates: this.#updates,
    };
    client.send(JSON.stringify(clientPayload));
    return { clientId };
  }

  shareUpdates(newUpdates: Update[], sender?: ws.WebSocket) {
    const updatesForSender = newUpdates.filter(update => !update.confirmed);
    this.#markCommonUpdatesConfirmed(newUpdates);
    this.#pushUpdates(newUpdates);
    commitUpdates(this.#state, Object.values(this.#updates));
    this.#updates = this.#updates.filter(update => !update.confirmed);
    this.#broadcastUpdates(newUpdates, client => client !== sender);
    this.#broadcastUpdates(updatesForSender, client => client === sender);
  }

  #pushUpdates(newUpdates: Update[] | undefined) {
    if (newUpdates) {
      newUpdates.forEach((update) => this.#updates.push(update));
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

  #markCommonUpdatesConfirmed(updates: Update[]) {
    updates.forEach((update) => {
      const parts = Array.isArray(update.path) ? update.path : update.path.split("/");
      if (parts[0] !== "clients") {
        update.confirmed = Date.now();
      }
    });
  }
}
