// To recognize dom types (see https://bun.sh/docs/typescript#dom-types):
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

import { ISharedData } from "./ISharedData";
import { ClientData } from "./ClientData";
import { SubData } from "./SubData";
import { CommInterface } from "./CommInterface";
import { ISyncClient } from "./ISyncClient";
import { IObservable } from "../observer/IObservable";
import { RoomState } from "../types/RoomState";
import { Processor } from "../core/Processor";
import { Update } from "../types/Update";
import { getData, pushData, setData } from "../cycles/data-update/data-manager";
import { SetDataOptions } from "../cycles/data-update/SetDataOptions";
import { UpdateOptions } from "../cycles/data-update/UpdateOptions";
import { Observer } from "../observer/Observer";
import { Context } from "../cycle/context/Context";

export type CommProvider = () => Promise<CommInterface>;

export class SyncClient implements ISharedData, ISyncClient, IObservable {
  readonly state: RoomState;
  readonly #children: Map<string, ISharedData> = new Map();
  #comm: CommInterface | undefined;
  #connectionPromise: Promise<void> | undefined;
  readonly #selfData: ClientData = new ClientData(this);
  protected localTimeOffset = 0;
  #nextFrameInProcess = false;
  protected secret?: string;
  readonly #processor: Processor = new Processor((blob) => {
    if (blob.size > 1024 * 1024 * 10) {
      console.error(`Blob too large: ${blob.size / 1024 / 1024} MB`,);
      return;
    }
    this.#comm?.send(blob);
  });
  protected readonly outgoingUpdates: Update[] = [];
  #closeListener = () => { };

  constructor(private commProvider: CommProvider, initialState: RoomState = {}) {
    this.state = initialState;
    this.#connect();
    globalThis.addEventListener("focus", () => {
      if (!this.#comm) {
        const autoReconnect = this.state.config?.autoReconnect ?? true;
        if (autoReconnect) {
          this.#connect().catch(e => {
            console.warn("Failed to reconnect");
          });
        }
      }
    });
    this.#children.set(`clients/~{self}`, this.#selfData);
  }

  onClose(listener: () => void) {
    this.#closeListener = listener;
    return this;
  }

  getData(path: string) {
    const properties = {
      self: this.clientId,
      now: this.now,
    };
    return getData(this.state, path, properties);
  }

  pushData(path: string, value: any, options: UpdateOptions = {}) {
    pushData(this.state, this.now, this.outgoingUpdates, path, value, options);
    this.#prepareNextFrame();
  }

  setData(path: string, value: any, options: SetDataOptions = {}) {
    setData(this.state, this.now, this.outgoingUpdates, path, value, options);
    this.#prepareNextFrame();
  }

  get clientId() {
    return this.#selfData.clientId;
  }

  get self(): ISharedData {
    return this.#selfData;
  }

  access(path: string): ISharedData {
    const childData = this.#children.get(path);
    if (childData) {
      return childData;
    }
    const subData = new SubData(path, this);
    this.#children.set(path, subData);
    return subData;
  }

  peerData(peerId: string): ISharedData {
    const peerTag = [this.clientId, peerId].sort().join(":");
    return this.access(`peer/${peerTag}`);
  }

  removeChildData(path: string) {
    this.#children.delete(path);
  }

  observe(paths?: (string[] | string)): Observer {
    return this.#processor.observe(paths);
  }

  removeObserver(observer: Observer): void {
    this.#processor.removeObserver(observer);
  }

  async #waitForConnection() {
    if (!this.#comm) {
      this.#connect();
    }
    return this.#connectionPromise;
  }

  async #connect() {
    const comm = this.#comm = await this.commProvider();
    return this.#connectionPromise = new Promise<void>((resolve, reject) => {
      comm.onError((event) => {
        console.error("SyncClient connection error", event);
        reject(event);
      });
      comm.onMessage(async (data) => {
        const preClientId = this.clientId;
        await this.onMessageBlob(data);
        if (!preClientId && this.clientId) {
          resolve();
        }
      });
      comm.onClose(() => {
        this.#comm = undefined;
        this.#closeListener();
      });
    });
  }

  close() {
    this.#comm?.close();
  }

  async onMessageBlob(blob: any, skipValidation: boolean = false) {
    const context: Context = {
      root: this.state,
      secret: this.secret,
      clientId: this.clientId,
      localTimeOffset: this.localTimeOffset,
      properties: {
        self: this.clientId,
        now: this.now,
      },
      skipValidation: skipValidation || this.state.config?.signPayloads === false,
      outgoingUpdates: this.outgoingUpdates,
    };
    await this.#processor.receivedBlob(blob, context);

    if (context.localTimeOffset) {
      this.localTimeOffset = context.localTimeOffset;
    }
    this.secret = context.secret;
    if (context.clientId) {
      this.#selfData.clientId = context.clientId;
    }

    this.#prepareNextFrame();
  }

  get now() {
    return Date.now() + this.localTimeOffset;
  }

  #prepareNextFrame() {
    if (this.#nextFrameInProcess) {
      return;
    }
    this.#nextFrameInProcess = true;
    requestAnimationFrame(() => {
      this.#nextFrameInProcess = false;
      this.processNextFrame();
    });
  }

  #removeEmptyUpdates() {
    let j = 0;
    for (let i = 0; i < this.outgoingUpdates.length; i++) {
      this.outgoingUpdates[j] = this.outgoingUpdates[i];
      if (this.outgoingUpdates[j]) {
        j++;
      }
    }
    this.outgoingUpdates.length = j;
  }

  protected async processNextFrame() {
    this.#removeEmptyUpdates();

    if (this.outgoingUpdates.length) {
      await this.#waitForConnection();
    }

    const context: Context = {
      root: this.state,
      secret: this.secret,
      clientId: this.clientId,
      localTimeOffset: this.localTimeOffset,
      properties: {
        self: this.clientId,
        now: this.now,
      },
      outgoingUpdates: this.outgoingUpdates,
      skipValidation: this.state.config?.signPayloads === false,
    };

    this.#processor.performCycle(context);
    if (context.clientId) {
      this.#selfData.clientId = context.clientId;
    }
    if (context.localTimeOffset) {
      this.localTimeOffset = context.localTimeOffset;
    }
    this.secret = context.secret;
  }
}
