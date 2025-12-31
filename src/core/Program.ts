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
  readonly aux: Record<string, Attachment> = {};
  readonly refresher: Set<Attachment> = new Set();
  preNow: number = 0;
  nowChunk: number = 0;

  constructor({ clientId, root, properties }: Props<T> = {}) {
    this.clientId = clientId;
    this.root = root ?? {} as T;
    this.properties = properties ?? {};
  }

  connectComm(comm: CommInterface): Connection {
    return hookCommInterface(this, comm, this.processor);
  }

  performCycle() {
    this.processor.performCycle(this);
  }

  observe(path: string | string[]) {
    return this.processor.observe(path);
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

  setData(path: string, value: any | ((value: any) => any)) {
    if (typeof (value) === "function") {
      const oldValue = getData(this.root, path, this.properties);
      value = value(oldValue);
      if (oldValue === value) {
        return;
      }
    }
    setData(this.now, this.outgoingUpdates, path, value, ACTIVE);
  }

  pushData(path: string, value: any | ((value: any) => any)) {
    if (typeof (value) === "function") {
      const oldValue = getData(this.root, path, this.properties);
      value = value(oldValue);
    }
    pushData(this.now, this.outgoingUpdates, path, value, ACTIVE);
  }

  private getAttachmentName(attachment: Attachment) {
    return attachment.constructor.name;
  }

  attach(attachment: Attachment): Connection {
    if (attachment.refresh) {
      this.refresher.add(attachment);
    }
    this.aux[this.getAttachmentName(attachment)] = attachment;
    attachment.onAttach?.(this);
    return {
      disconnect: () => {
        attachment.onDetach?.(this);
        delete this.aux[this.getAttachmentName(attachment)];
        this.refresher.delete(attachment);
      },
    };
  }

  refresh(): void {
    this.refresher.forEach(r => r.refresh?.(this));
  }
}
