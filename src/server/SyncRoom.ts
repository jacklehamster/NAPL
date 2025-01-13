import ws from "ws";
import { commitUpdates } from "@/data-update";
import { Update } from "@/types/Update";
import { addMessageReceiver } from "./SocketEventHandler";
import { Payload } from "./SocketPayload";
import { ClientState } from "@/types/ClientState";
import { RoomState } from "@/types/ServerState";
import { BlobBuilder } from "@dobuki/data-blob";

export class SyncRoom {
  readonly #sockets: Map<ws.WebSocket, ClientState> = new Map();
  readonly #state: RoomState;
  readonly #onRoomChange = new Set<(roomState: RoomState) => void>();
  #updates: Update[] = [];

  constructor(private room: string) {
    this.#state = {
      clients: {},
    };
  }

  addRoomChangeListener(callback: (roomState: RoomState) => void) {
    this.#onRoomChange.add(callback);
  }

  async welcomeClient(client: ws.WebSocket) {
    //  initialize client state
    const clientId = crypto.randomUUID();
    const clientPath = `clients/${clientId}`;
    const clientState: ClientState = {};
    this.#sockets.set(client, clientState);
    const newUpdates: Update[] = [
      {
        path: clientPath,
        value: clientState,
        confirmed: Date.now(),
      }
    ];
    this.#shareUpdates(newUpdates, client);

    //  setup events
    addMessageReceiver(client, {
      payloadReceived: (payload) => {
        if (payload.updates) {
          this.#shareUpdates(payload.updates, client);
        }
      },
    });

    client.on("close", () => {
      this.#sockets.delete(client);
      this.#shareUpdates([
        {
          path: clientPath,
          value: undefined,
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
    client.send(await BlobBuilder.payload(clientPayload).build().arrayBuffer());
    return { clientId };
  }

  #shareUpdates(newUpdates: Update[], sender?: ws.WebSocket) {
    const updatesForSender = newUpdates.filter(update => !update.confirmed);
    this.#markCommonUpdatesConfirmed(newUpdates);
    this.#pushUpdates(newUpdates);
    commitUpdates(this.#state, this.#updates);
    this.#updates = this.#updates.filter(update => !update.confirmed);
    this.#broadcastUpdates(newUpdates, client => client !== sender);
    this.#broadcastUpdates(updatesForSender, client => client === sender);
  }

  #pushUpdates(newUpdates: Update[] | undefined) {
    if (newUpdates) {
      newUpdates.forEach((update) => this.#updates.push(update));
    }
  }

  async #broadcastUpdates(newUpdates: Update[] | undefined, senderFilter?: (sender: ws.WebSocket) => boolean) {
    if (!newUpdates?.length) {
      return;
    }
    const blob = BlobBuilder.payload({ updates: newUpdates }).build();
    const buffer = await blob.arrayBuffer();

    this.#sockets.keys().forEach((client) => {
      if (senderFilter && !senderFilter(client)) {
        return;
      }
      client.send(buffer);
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
