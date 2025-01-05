// To recognize dom types (see https://bun.sh/docs/typescript#dom-types):
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

import { commitUpdates } from "@/data-update";
import { Payload } from "@/server/SocketPayload";
import { Update } from "@/types/Update";

export class SocketClient {
  clientId: string = "";
  state: Record<string, any> = {};
  #socket: WebSocket | undefined;
  #connectionPromise: Promise<void> | undefined;
  readonly pathsUpdated: Set<string> = new Set();
  readonly #connectionUrl: string;
  readonly #outgoingUpdates: Update[] = [];
  readonly #incomingUpdates: Update[] = [];

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

  async #waitForConnection() {
    if (!this.#socket) {
      this.#connect();
    }
    return this.#connectionPromise;
  }

  async #connect() {
    const socket = this.#socket = new WebSocket(this.#connectionUrl);
    return this.#connectionPromise = new Promise<void>((resolve, reject) => {
      socket.addEventListener("open", (event) => {
        console.log("Connected to WebSocket server", this.#connectionUrl);
      });
      socket.addEventListener("error", (event) => {
        console.error("Error connecting to WebSocket server", event);
        reject(event);
      });

      socket.addEventListener("message", (event: any) => {
        const payload: Payload = JSON.parse(event.data.toString());
        if (payload.myClientId) {
          this.clientId = payload.myClientId;
          // client ID confirmed
          this.#connectionPromise = undefined;
          resolve();
        }
        if (payload.state) {
          this.state = payload.state;
        }
        if (payload.updates) {
          this.#queueIncomingUpdates(...payload.updates);
        }
      });

      socket.addEventListener("close", () => {
        console.log("Disconnected from WebSocket server");
        this.#socket = undefined;
        this.clientId = "";
      });
    });
  }

  async setSelfData(path: Update["path"], value: any) {
    await this.#waitForConnection();
    const parts = Array.isArray(path) ? path : path.split("/");
    return this.setData(["clients", this.clientId, ...parts], value);
  }

  async setData(path: Update["path"], value: any, options: {
    passive?: boolean,
  } = {}) {
    await this.#waitForConnection();
    //  apply update locally
    const update: Update = {
      path,
      value,
      confirmed: options.passive ? undefined : Date.now(),
    };

    //  commit updates
    if (!options.passive) {
      this.#queueIncomingUpdates(update);
    }

    this.#queueOutgoingUpdates(update);
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
    const payload: Payload = {
      updates: this.#outgoingUpdates,
    };
    this.#socket?.send(JSON.stringify(payload));
    this.#outgoingUpdates.length = 0;
  }

  async #applyUpdates() {
    await this.#waitForConnection();
    this.pathsUpdated.clear();
    commitUpdates(this.state, this.#incomingUpdates, this.pathsUpdated);
    this.#incomingUpdates.length = 0;
    this.state.lastUpdated = Date.now();
  }
}
