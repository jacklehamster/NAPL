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
import { executeFrame, prepareNextFrame } from "@/utils/execution-utils";

export type CommProvider = () => CommInterface;

export class SyncClient implements ISharedData, ISyncClient, IObservable {
  readonly state: RoomState;
  readonly #children: Map<string, ISharedData> = new Map();
  #comm: CommInterface | undefined;
  #connectionPromise: Promise<void> | undefined;
  readonly #selfData: ClientData = new ClientData(this);
  readonly #processor: Processor = new Processor((data, peer) => {
    if (data.length > 1024 * 1024 * 10) {
      console.error(`Data too large: ${data.length / 1024 / 1024} MB`,);
      return;
    }
    this.#comm?.send(data, peer);
  });
  protected readonly outgoingUpdates: Update[] = [];
  protected readonly incomingUpdates: Update[] = [];
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
    this.processNextFrame = this.processNextFrame.bind(this);
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
    if (options.flush) {
      executeFrame(this.processNextFrame);
    } else {
      prepareNextFrame(this.processNextFrame);
    }
  }

  setData(path: string, value: any, options: SetDataOptions = {}) {
    setData(this.state, this.now, this.outgoingUpdates, path, value, options);
    if (options.flush) {
      executeFrame(this.processNextFrame);
    } else {
      prepareNextFrame(this.processNextFrame);
    }
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
    const comm = this.#comm = this.commProvider();

    return this.#connectionPromise = new Promise<void>((resolve, reject) => {
      comm.onError?.((event) => {
        console.error("SyncClient connection error", event);
        reject(event);
      });
      comm.onMessage(async (data) => {
        await this.onMessageBlob(data);
        if (this.#connectionPromise && this.clientId) {
          this.#connectionPromise = undefined;
          resolve();
        }
      });
      comm.onClose?.(() => {
        this.#comm = undefined;
        this.#closeListener();
        this.setData(`/clients/${this.clientId}`, undefined, {
          active: true,
          flush: true,
        });
      });
    });
  }

  close() {
    this.#comm?.close?.();
  }

  async onMessageBlob(blob: any) {
    const context: Context = {
      root: this.state,
      clientId: this.clientId,
      properties: {
        self: this.clientId,
        now: this.now,
      },
      incomingUpdates: this.incomingUpdates,
      outgoingUpdates: this.outgoingUpdates,
    };
    await this.#processor.receivedData(blob, context);

    if (context.clientId) {
      this.#selfData.clientId = context.clientId;
    }
    executeFrame(this.processNextFrame);
  }

  get now() {
    return Date.now();
  }

  protected async processNextFrame() {
    if (this.outgoingUpdates.length) {
      await this.#waitForConnection();
    }

    const context: Context = {
      root: this.state,
      clientId: this.clientId,
      properties: {
        self: this.clientId,
        now: this.now,
      },
      outgoingUpdates: this.outgoingUpdates,
      incomingUpdates: this.incomingUpdates,
    };

    this.#processor.performCycle(context);
    if (context.clientId) {
      this.#selfData.clientId = context.clientId;
    }
  }
}
