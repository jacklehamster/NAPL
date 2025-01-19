// To recognize dom types (see https://bun.sh/docs/typescript#dom-types):
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

import { commitUpdates, getLeafObject } from "@/data-update";
import { Update } from "@/types/Update";
import { ISharedData, SetDataOptions } from "./ISharedData";
import { ClientData } from "./ClientData";
import { SubData } from "./SubData";
import { Observer } from "./Observer";
import { BlobBuilder, extractPayload } from "@dobuki/data-blob";
import { IObservable } from "./IObservable";
import { ObserverManager } from "./ObserverManager";
import { extractBlobsFromPayload } from "@dobuki/data-blob";

export class SocketClient implements ISharedData, IObservable {
  state: Record<string, any> = {};
  #socket: WebSocket | undefined;
  #connectionPromise: Promise<void> | undefined;
  readonly #connectionUrl: string;
  readonly #outgoingUpdates: Update[] = [];
  readonly #incomingUpdates: Update[] = [];
  readonly #selfData: ClientData = new ClientData(this);
  readonly #observerManager = new ObserverManager(this);

  constructor(host: string, room?: string) {
    const secure = globalThis.location.protocol === "https:";
    this.#connectionUrl = `${secure ? "wss" : "ws"}://${host}${room ? `?room=${room}` : ""}`;
    this.#connect();
    globalThis.addEventListener("focus", () => {
      if (!this.#socket) {
        this.#connect();
      }
    });
  }

  #fixPath(path: Update["path"]) {
    const split = path.split("/");
    return split.map(part => part === "{self}" ? this.#selfData.id : part).join("/");
  }

  #usefulUpdate(update: Update) {
    const currentValue = getLeafObject(this.state, update.path, 0, false, this.#selfData.id);
    return update.value !== currentValue;
  }

  async setData(path: Update["path"], value: any, options?: SetDataOptions) {
    await this.#waitForConnection();

    const payloadBlobs: Record<string, Blob> = {};
    value = await extractBlobsFromPayload(value, payloadBlobs);

    const update: Update = {
      path: this.#fixPath(path),
      value: options?.delete ? undefined : value,
      confirmed: options?.passive ? undefined : Date.now(),
      push: options?.push,
      insert: options?.insert,
      blobs: payloadBlobs,
    };

    if (!this.#usefulUpdate(update)) {
      return;
    }

    //  commit updates locally
    if (!options?.passive) {
      this.#queueIncomingUpdates(update);
    }
    this.#queueOutgoingUpdates(update);
  }

  get clientId() {
    return this.#selfData.id;
  }

  get self(): ISharedData {
    return this.#selfData;
  }

  access(path: Update["path"]): SubData {
    return new SubData(path, this);
  }

  observe(...paths: Update["path"][]): Observer {
    return this.#observerManager.observe(...paths);
  }

  async #waitForConnection() {
    if (!this.#socket) {
      this.#connect();
    }
    return this.#connectionPromise;
  }

  async #connect() {
    const socket = this.#socket = new WebSocket(this.#connectionUrl);
    return this.#connectionPromise = new Promise<void>((resolve, reject) => {
      socket.addEventListener("open", () => {
        console.log("Connected to WebSocket server", this.#connectionUrl);
      });
      socket.addEventListener("error", (event) => {
        console.error("Error connecting to WebSocket server", event);
        reject(event);
      });

      socket.addEventListener("message", async (event: MessageEvent<Blob>) => {
        const { payload, ...blobs } = await extractPayload(event.data);

        if (payload?.myClientId) {
          // client ID confirmed
          this.#selfData.id = payload.myClientId;
          this.#connectionPromise = undefined;
          resolve();
        }
        if (payload?.state) {
          this.state = payload.state;
          this.state.blobs = blobs;
        }
        if (payload?.updates) {
          const updates: Update[] = payload.updates;
          updates.forEach(update => {
            const updateBlobs = update.blobs ?? {};
            Object.keys(updateBlobs).forEach(key => updateBlobs[key] = blobs[key]);
          });
          this.#queueIncomingUpdates(...payload.updates);
        }
        this.#observerManager.triggerObservers();
      });

      socket.addEventListener("close", () => {
        console.log("Disconnected from WebSocket server");
        this.#socket = undefined;
        this.#selfData.id = "";
      });
    });
  }

  #queueOutgoingUpdates(...updates: Update[]) {
    //  send broadcast
    if (!this.#outgoingUpdates.length) {
      requestAnimationFrame(() => this.#broadcastUpdates());
    }
    this.#outgoingUpdates.push(...updates);
  }

  #queueIncomingUpdates(...updates: Update[]) {
    //  apply updates
    if (!this.#incomingUpdates.length) {
      requestAnimationFrame(() => this.#applyUpdates());
    }
    this.#incomingUpdates.push(...updates);
  }

  async #broadcastUpdates() {
    await this.#waitForConnection();
    const blobBuilder = BlobBuilder.payload("payload", { updates: this.#outgoingUpdates });
    const addedBlob = new Set<string>();
    this.#outgoingUpdates.forEach(update => {
      Object.entries(update.blobs ?? {}).forEach(([key, blob]) => {
        if (!addedBlob.has(key)) {
          blobBuilder.blob(key, blob);
          addedBlob.add(key);
        }
      });
    });
    this.#socket?.send(blobBuilder.build());
    this.#outgoingUpdates.length = 0;
  }

  #saveBlobsFromUpdates(updates: Update[]) {
    updates.forEach(update => Object.entries(update.blobs ?? {}).forEach(([key, blob]) => {
      this.state.blobs[key] = blob;
    }));
  }

  #applyUpdates() {
    this.#saveBlobsFromUpdates(this.#incomingUpdates);
    commitUpdates(this.state, this.#incomingUpdates);
    this.#incomingUpdates.length = 0;
    this.state.lastUpdated = Date.now();
    this.#observerManager.triggerObservers();
  }

  removeObserver(observer: Observer) {
    this.#observerManager.removeObserver(observer);
  }
}
