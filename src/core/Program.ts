import { Context } from "@/context/Context";
import { Update } from "@/types/Update";
import { Processor } from "./Processor";
import { CommInterface } from "@/clients/CommInterface";
import { hookCommInterface } from "@/clients/CommInterfaceHook";
import { getData, setData } from "@/cycles/data-update/data-manager";
import { UpdateOptions } from "@/cycles/data-update/UpdateOptions";
import { Data } from "@/types/Data";
import { ObserverManager } from "@/observer/ObserverManager";
import { Observer } from "@/observer/Observer";

interface Props<T extends Data> {
  userId: string;
  root?: Record<string, T>;
  properties?: Record<string, any>;
}

const ACTIVE: UpdateOptions = {
  active: true,
};

export class Program<T extends Data = Data> implements Context<T> {
  readonly userId: string;
  readonly root: Record<string, T>;
  readonly incomingUpdates: Update[] = [];
  readonly outgoingUpdates: Update[] = [];
  readonly updateTimestamp: Record<string, number> = {};
  readonly properties: Record<string, any>;
  private readonly processor: Processor = new Processor();
  private readonly observerManager: ObserverManager = new ObserverManager();
  private preNow: number = 0;
  private nowChunk: number = 0;

  constructor({ userId, root, properties }: Props<T>) {
    this.userId = userId;
    this.root = root ?? {};
    this.properties = properties ?? {};
    this.properties.self = userId;
  }

  connectComm(comm: CommInterface) {
    return hookCommInterface(this, comm, this.processor);
  }

  performCycle() {
    const updates = this.processor.performCycle(this);
    if (updates) {
      this.observerManager.triggerObservers(this, updates);
      return true;
    }
    return false;
  }

  observe(paths?: (string[] | string)): Observer {
    const multi = Array.isArray(paths);
    const pathArray = paths === undefined ? [] : multi ? paths : [paths];
    return this.observerManager.observe(pathArray, multi);
  }

  removeObserver(observer: Observer): void {
    this.observerManager.removeObserver(observer);
  }

  get now() {
    const t = Date.now();
    if (this.preNow === t) {
      this.nowChunk++;
    } else {
      this.nowChunk = 0;
      this.preNow = t;
    }
    return t + this.nowChunk / 1000;
  }

  setData(path: string, value: Data | ((value: Data) => Data)) {
    if (typeof (value) === "function") {
      const oldValue = getData(this.root, path, this.properties);
      value = value(oldValue);
      if (oldValue === value) {
        return;
      }
    }
    setData(this.now, this.outgoingUpdates, path, value, ACTIVE);
  }
}
