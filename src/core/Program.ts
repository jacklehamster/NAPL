import { Context } from "@/context/Context";
import { Update } from "@/types/Update";
import { Processor } from "./Processor";
import { CommInterface } from "@/clients/CommInterface";
import { hookCommInterface } from "@/clients/CommInterfaceHook";
import { Connection } from "@/connections/Connection";
import { getData, pushData, setData } from "@/cycles/data-update/data-manager";
import { UpdateOptions } from "@/cycles/data-update/UpdateOptions";
import { Attachment } from "@/attachments/Attachment";
import { Data } from "@/types/Data";

interface Props<T extends Data> {
  clientId?: string;
  root?: T;
  properties?: Record<string, any>;
}

const ACTIVE: UpdateOptions = {
  active: true,
};

export class Program<T extends Data = Data> implements Context<T> {
  clientId?: string;
  readonly incomingUpdates: Update[] = [];
  readonly outgoingUpdates: Update[] = [];
  readonly root: T;
  readonly properties: Record<string, any>;
  readonly processor: Processor = new Processor();
  readonly refresher: Set<Attachment> = new Set();

  constructor({ clientId, root, properties }: Props<T> = {}) {
    this.clientId = clientId;
    this.root = root ?? {} as T;
    this.properties = properties ?? {};
  }

  connectComm(comm: CommInterface): Connection {
    return hookCommInterface(this, comm, this.processor);
  }

  start() {
    return this.processor.startCycle(this);
  }

  observe(path: string | string[]) {
    return this.processor.observe(path);
  }

  get now() {
    return Date.now();
  }

  setData(path: string, value: any | ((value: any) => any)) {
    if (typeof (value) === "function") {
      const oldValue = getData(this, path, this.properties);
      value = value(oldValue);
      if (oldValue === value) {
        return;
      }
    }
    setData(this.root, this.now, this.outgoingUpdates, path, value, ACTIVE);
  }

  pushData(path: string, value: any | ((value: any) => any)) {
    if (typeof (value) === "function") {
      const oldValue = getData(this, path, this.properties);
      value = value(oldValue);
    }
    pushData(this.root, this.now, this.outgoingUpdates, path, value, ACTIVE);
  }

  attach(attachment: Attachment): Connection {
    const detach = attachment.onAttach?.(this);
    if (attachment.refresh) {
      this.refresher.add(attachment);
    }
    return {
      disconnect: () => {
        detach?.();
        this.refresher.delete(attachment);
      },
    };
  }

  refresh(): void {
    this.refresher.forEach(r => r.refresh?.(this));
  }
}
