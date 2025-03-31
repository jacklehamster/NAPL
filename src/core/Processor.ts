/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

import { Context } from "@/cycle/context/Context";
import { packageUpdates, receiveBlob } from "@/cycles/data-update/blob-utils";
import { commitUpdates, getLeafObject, translateValue } from "@/cycles/data-update/data-update";
import { Observer } from "@/observer/Observer";
import { ObserverManager } from "@/observer/ObserverManager";
import { Update } from "@/types/Update";
import { extractBlobsFromPayload, includeBlobsInPayload } from "@dobuki/data-blob";
import { validatePayload } from "@dobuki/payload-validator";

export class Processor {
  readonly #observerManager = new ObserverManager();

  constructor(private sendUpdate: (blob: Blob, context: Context) => void) {
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
    this.sendUpdateBlob(context);
    const updates = commitUpdates(context.root, context.properties);
    this.#observerManager.triggerObservers(context, updates);
    return updates;
  }

  sendUpdateBlob(context: Context) {
    const blobs: Record<string, Blob> = {};
    const outgoingUpdates = context.outgoingUpdates;
    context.outgoingUpdates = [];
    if (outgoingUpdates?.length) {
      //  Apply function to value
      for (let update of outgoingUpdates) {
        update.path = this.#fixPath(update.path, context);
        const previous = getLeafObject(context.root, update.path.split("/"), 0, false);
        update.value = typeof update.value === "function" ? update.value(previous) : update.value;
      }

      //  Apply incoming updates
      const confirmedUpdates = outgoingUpdates
        .filter(update => update.confirmed)
        .map(update => ({ ...update }));
      this.#addIncomingUpdates(confirmedUpdates, context);

      //  send outgoing updates
      for (let update of outgoingUpdates) {
        update.value = extractBlobsFromPayload(update.value, blobs);
      }
      if (outgoingUpdates.length) {
        const blob = packageUpdates(outgoingUpdates, blobs, context.secret);
        this.sendUpdate(blob, context);
      }
    }
  }

  async receivedBlob(data: any | Blob, context: Context) {
    const { payload, blobs } = data instanceof Blob ? await receiveBlob(data) : { payload: typeof (data) === "string" ? JSON.parse(data) : data, blobs: {} };
    const secret = context.secret ?? payload.secret;
    if (secret) {
      if (!context.skipValidation && !validatePayload(payload, { secret })) {
        console.error("Invalid signature", payload);
        return;
      }
      context.secret = secret;
    }

    const hasBlobs = blobs && Object.keys(blobs).length > 0;

    if (payload?.globalTime) {
      context.localTimeOffset = payload.globalTime - Date.now();
    }

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
