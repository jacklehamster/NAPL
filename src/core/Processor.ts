/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

import { Context } from "../cycle/context/Context";
import { packageUpdates, receiveBlob } from "../cycles/data-update/blob-utils";
import { commitUpdates, getLeafObject, translateValue } from "../cycles/data-update/data-update";
import { Observer } from "../observer/Observer";
import { ObserverManager } from "../observer/ObserverManager";
import { Update } from "../types/Update";
import { extractBlobsFromPayload, includeBlobsInPayload } from "@dobuki/data-blob";

export class Processor {
  readonly #observerManager = new ObserverManager();

  constructor(private sendUpdate: (blob: Blob) => void) {
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
    this.#sendUpdateBlob(context);
    const updates = commitUpdates(context.root, context.properties);
    this.#observerManager.triggerObservers(context, updates);
    return updates;
  }

  #sendUpdateBlob(context: Context) {
    if (context.outgoingUpdates?.length) {
      //  Apply function to value
      context.outgoingUpdates.forEach(update => {
        update.path = this.#fixPath(update.path, context);
        const previous = getLeafObject(context.root, update.path.split("/"), 0, false);
        update.value = typeof update.value === "function" ? update.value(previous) : update.value;
      });

      //  Apply incoming updates
      const confirmedUpdates = context.outgoingUpdates.filter(({ confirmed }) => confirmed)
        .map(update => ({ ...update }));
      this.#addIncomingUpdates(confirmedUpdates, context);

      //  send outgoing updates
      const blobs: Record<string, Blob> = {};
      context.outgoingUpdates.forEach(update => update.value = extractBlobsFromPayload(update.value, blobs));
      this.sendUpdate(packageUpdates(context.outgoingUpdates, blobs));
    }
    context.outgoingUpdates.length = 0;
  }

  async receivedBlob(data: any | Blob, context: Context) {
    const { payload, blobs } = data instanceof Blob ? await receiveBlob(data) : { payload: typeof (data) === "string" ? JSON.parse(data) : data, blobs: {} };
    const hasBlobs = blobs && Object.keys(blobs).length > 0;

    if (payload?.myClientId) {
      // client ID confirmed
      context.clientId = payload.myClientId;
    }
    if (payload?.updates) {
      if (hasBlobs) {
        payload.updates.forEach((update: Update) => {
          update.value = includeBlobsInPayload(update.value, blobs);
        });
      }
      this.#addIncomingUpdates(payload.updates, context);
    }
  }

  #addIncomingUpdates(updates: Update[], context: Context) {
    context.root.updates = context.root.updates ?? [];
    context.root.updates.push(...updates);
  }

  #fixPath(path: string, context: Context) {
    const split = path.split("/");
    return split.map(part => translateValue(part, {
      self: context.clientId,
    })).join("/");
  }
}
