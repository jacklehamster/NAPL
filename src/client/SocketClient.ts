// To recognize dom types (see https://bun.sh/docs/typescript#dom-types):
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

import { commitUpdates } from "@/data-update";
import { Payload } from "@/server/SocketPayload";
import { Update } from "@/types/Update";

export class SocketClient {
  clientId: string = "";
  state: Record<string, any> = {};
  private socket: WebSocket | undefined;
  private readonly connectionUrl: string;
  private readonly pendingUpdates: Update[] = [];
  #connectionPromise: Promise<void> | undefined;

  constructor(host: string, room: string = "default") {
    const secure = globalThis.location.protocol === "https:";
    this.connectionUrl = `${secure ? "wss" : "ws"}://${host}?room=${room}`;
    this.#connect();
    globalThis.addEventListener("focus", () => {
      if (!this.socket) {
        this.#connect();
      }
    });
  }

  async #waitForConnection() {
    if (!this.socket) {
      this.#connect();
    }
    return this.#connectionPromise;
  }

  async #connect() {
    const socket = this.socket = new WebSocket(this.connectionUrl);
    return this.#connectionPromise = new Promise<void>((resolve, reject) => {
      socket.addEventListener("open", (event) => {
        console.log(`Connected to WebSocket server ${this.connectionUrl}`);
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
          commitUpdates(this.state, payload.updates);
        }
      });

      socket.addEventListener("close", () => {
        console.log("Disconnected from WebSocket server");
        this.socket = undefined;
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
      timestamp: Date.now(),
      path,
      value,
      confirmed: !options.passive,
    };

    //  commit updates
    if (!options.passive) {
      commitUpdates(this.state, [update]);
    }

    //  send broadcast
    if (!this.pendingUpdates.length) {
      requestAnimationFrame(() => {
        this.#broadcastUpdates();
      });
    }
    this.pendingUpdates.push(update);
  }

  async #broadcastUpdates() {
    await this.#waitForConnection();
    const payload: Payload = {
      updates: this.pendingUpdates,
    };
    this.socket?.send(JSON.stringify(payload));
    this.pendingUpdates.length = 0;
  }
}
