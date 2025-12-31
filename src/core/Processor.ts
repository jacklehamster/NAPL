/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

import { decode, encode } from "@msgpack/msgpack";
import { Context } from "../context/Context";
import { commitUpdates, getLeafObject, translateValue } from "../cycles/data-update/data-update";
import { Observer } from "../observer/Observer";
import { ObserverManager } from "../observer/ObserverManager";
import { Update } from "../types/Update";
import { Payload } from "@/types/Payload";
import { OutgoingCom } from "@/clients/CommInterface";

export class Processor {
  readonly #observerManager = new ObserverManager();
  readonly #outingCom = new Set<OutgoingCom>();

  connectComm(comm: OutgoingCom) {
    this.#outingCom.add(comm);
    return () => {
      this.#outingCom.delete(comm);
    };
  }

  observe(paths?: (string[] | string)): Observer {
    const multi = Array.isArray(paths);
    const pathArray = paths === undefined ? [] : multi ? paths : [paths];
    return this.#observerManager.observe(pathArray, multi);
  }

  removeObserver(observer: Observer): void {
    this.#observerManager.removeObserver(observer);
  }

  performCycle(context: Context) {
    this.#sendUpdate(context);
    const updates = commitUpdates(context.root, context.incomingUpdates, context.properties);
    if (updates) {
      this.#observerManager.triggerObservers(context, updates);
    }
    context.refresh?.();
  }

  receivedData(data: ArrayBuffer | SharedArrayBuffer, context: Context) {
    const payload = decode(data) as Payload;

    if (payload?.updates?.length) {
      this.#addIncomingUpdates(payload.updates, context);
    }
  }


  #sendUpdate(context: Context) {
    if (!context.outgoingUpdates.length) return;
    //  Apply function to value
    context.outgoingUpdates.forEach(update => {
      update.path = this.#fixPath(update.path, context);
      const previous = getLeafObject(context.root, update.path.split("/"), 0, false);
      update.value = typeof update.value === "function" ? update.value(previous) : update.value;
    });

    //  Apply incoming updates
    const confirmedUpdates = context.outgoingUpdates.filter(({ confirmed }) => confirmed);
    this.#addIncomingUpdates(confirmedUpdates, context);

    //  send outgoing updates
    const peerSet = new Set<string | undefined>();
    context.outgoingUpdates.forEach(update => peerSet.add(update.peer));

    peerSet.forEach((peer) => {
      this.#outingCom.forEach(comm => {
        comm.send(encode({
          updates: context.outgoingUpdates
            .filter(update => !update.peer || update.peer === peer)
        }), peer);
      });
    });
    context.outgoingUpdates.length = 0;
  }

  #addIncomingUpdates(updates: Update[], context: Context) {
    context.incomingUpdates.push(...updates);
  }

  #fixPath(path: string, context: Context) {
    const split = path.split("/");
    return split.map(part => translateValue(part, {
      self: context.clientId,
      ...context.properties,
    })).join("/");
  }
}
