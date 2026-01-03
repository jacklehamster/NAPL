import { Context } from "@/context/Context";
import { Update } from "@/types/Update";
import { CommInterface } from "@/clients/CommInterface";
import { setData } from "@/cycles/data-update/data-manager";
import { UpdateOptions } from "@/cycles/data-update/UpdateOptions";
import { Data } from "@/types/Data";
import { ObserverManager } from "@/observer/ObserverManager";
import { Observer } from "@/observer/Observer";
import { CommAux } from "@/attachments/comm/CommAux";

interface Props<T extends Data> {
  userId: string;
  root?: Record<string, T>;
  properties?: Record<string, any>;
  onDataCycle?: () => void;
  runCycleOnSetData?: boolean;
  comm: CommInterface;
  onReceivedIncomingUpdates?: () => void;
}

export class Program<T extends Data = Data> implements Context<T> {
  readonly userId: string;
  readonly root: Record<string, T>;
  readonly incomingUpdates: Update[] = [];
  readonly outgoingUpdates: Update[] = [];
  readonly properties: Record<string, any>;
  private readonly commAux: CommAux;
  private readonly observerManager = new ObserverManager();
  private onDataCycle?(): void;
  onReceivedIncomingUpdates?(): void;

  constructor({
    userId,
    root,
    properties,
    onDataCycle,
    comm,
    onReceivedIncomingUpdates,
  }: Props<T>) {
    this.userId = userId;
    this.root = root ?? {};
    this.properties = properties ?? {};
    this.properties.self = userId;
    this.onDataCycle = onDataCycle;
    this.commAux = new CommAux(comm, this);
    this.onReceivedIncomingUpdates = onReceivedIncomingUpdates;
  }

  performCycle() {
    const updates = this.commAux.performCycle();
    if (updates) {
      this.observerManager.triggerObservers(this, updates);
      this.onDataCycle?.();
    }
  }

  observe(paths?: string[] | string): Observer {
    const multi = Array.isArray(paths);
    const pathArray = paths === undefined ? [] : multi ? paths : [paths];
    return this.observerManager.observe(pathArray, multi);
  }

  private static readonly ACTIVE = { active: true };
  setData(path: string, value: Data) {
    setData(Date.now(), this.outgoingUpdates, path, value, Program.ACTIVE);
  }

  close() {
    this.commAux.disconnect();
  }
}
