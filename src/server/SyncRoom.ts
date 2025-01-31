import { WebSocket } from "ws";
import { commitUpdates } from "@/data-update";
import { Update } from "@/types/Update";
import { addMessageReceiver } from "./SocketEventHandler";
import { Payload } from "./SocketPayload";
import { ClientState } from "@/types/ClientState";
import { RoomState } from "@/types/ServerState";
import { BlobBuilder } from "@dobuki/data-blob";

export class SyncRoom {
  readonly #sockets: Map<WebSocket, ClientState> = new Map();
  readonly #state: RoomState;
  readonly #onRoomChange = new Set<(roomState: RoomState) => void>();
  #updates: Update[] = [];

  constructor(private room: string) {
    this.#state = {
      clients: {},
      blobs: {},
    };
  }

  addRoomChangeListener(callback: (roomState: RoomState) => void) {
    this.#onRoomChange.add(callback);
  }

  async welcomeClient(client: WebSocket) {
    //  initialize client state
    const clientId = crypto.randomUUID();
    const clientPath = `clients/${clientId}`;
    const clientState: ClientState = {};
    this.#sockets.set(client, clientState);

    //  annouce new client to all clients
    const newUpdates: Update[] = [{
      path: clientPath,
      value: clientState,
      confirmed: Date.now(),
      blobs: {},
    }];
    this.#shareUpdates(newUpdates, client);

    //  setup events
    addMessageReceiver(client, (payload, blobs) => {
      Object.entries(blobs).forEach(([key, blob]) => this.#state.blobs[key] = blob);
      payload.updates?.forEach(update => {
        const blobs = update.blobs ?? {};
        Object.keys(blobs).forEach(key => blobs[key] = this.#state.blobs[key]);
      });
      this.#shareUpdates(payload.updates, client);
      setImmediate(() => this.#cleanupBlobs());
    });

    client.on("close", () => {
      this.#sockets.delete(client);
      this.#shareUpdates([{
        path: clientPath,
        value: undefined,
        confirmed: Date.now(),
        blobs: {},
      }]);
      console.log(`client ${clientId} disconnected from room ${this.room}`);
      this.#onRoomChange.forEach((callback) => callback(this.#state));
    });

    //  apply updates to clients
    commitUpdates(this.#state, this.#updates);
    this.#updates = this.#updates.filter(update => !update.confirmed)

    //  update client just connected with state and updates
    const blobBuilder = BlobBuilder.payload<Payload>("payload", {
      myClientId: clientId,
      state: { ...this.#state, blobs: undefined },
      updates: this.#updates,
    });
    Object.entries(this.#state.blobs).forEach(([key, blob]) => blobBuilder.blob(key, blob));
    this.#updates.forEach(update => Object.entries(update.blobs ?? {}).forEach(([key, blob]) => blobBuilder.blob(key, blob)));

    client.send(await blobBuilder.build().arrayBuffer());
    return { clientId };
  }

  #shareUpdates(newUpdates?: Update[], sender?: WebSocket) {
    if (!newUpdates?.length) {
      return;
    }
    const updatesForSender = newUpdates.filter(update => !update.confirmed);
    this.#markCommonUpdatesConfirmed(newUpdates);
    this.#pushUpdates(newUpdates);
    commitUpdates(this.#state, this.#updates);
    this.#updates = this.#updates.filter(update => !update.confirmed);
    this.#broadcastUpdates(newUpdates, client => client !== sender);
    this.#broadcastUpdates(updatesForSender, client => client === sender);
  }

  #pushUpdates(newUpdates: Update[] | undefined) {
    newUpdates?.forEach((update) => this.#updates.push(update));
  }

  async #broadcastUpdates(newUpdates: Update[] | undefined, senderFilter?: (sender: WebSocket) => boolean) {
    if (!newUpdates?.length) {
      return;
    }
    const blobBuilder = BlobBuilder.payload("payload", { updates: newUpdates });
    newUpdates.forEach(update => Object.entries(update.blobs ?? {}).forEach(([key, blob]) => blobBuilder.blob(key, blob)));
    const buffer = await blobBuilder.build().arrayBuffer();

    this.#sockets.keys().forEach((client) => {
      if (senderFilter && !senderFilter(client)) {
        return;
      }
      client.send(buffer);
    });
  }

  #markCommonUpdatesConfirmed(updates: Update[]) {
    updates.forEach((update) => {
      if (!this.#restrictedPath(update.path)) {
        update.confirmed = Date.now();
      }
    });
  }

  #restrictedPath(path: string) {
    return path.startsWith("clients/") || path.startsWith("blobs/");
  }

  #cleanupBlobs() {
    const blobSet = new Set(Object.keys(this.#state.blobs));
    this.#findUsedBlobs(this.#state, blobSet);
    if (blobSet.size) {
      // Remove blobs
      const updates: Update[] = [];
      const now = Date.now();
      blobSet.forEach(key => {
        updates.push({
          path: `blobs/${key}`,
          value: undefined,
          confirmed: now,
        });
      });
      this.#shareUpdates(updates);
    }
  }

  #findUsedBlobs(root: any, blobSet: Set<string>) {
    if (typeof root === "string") {
      if (blobSet.has(root)) {
        blobSet.delete(root);
      }
    } else if (Array.isArray(root)) {
      root.forEach(value => this.#findUsedBlobs(value, blobSet));
    } else if (root && typeof root === "object") {
      Object.values(root).forEach(value => this.#findUsedBlobs(value, blobSet));
    }
  }
}
