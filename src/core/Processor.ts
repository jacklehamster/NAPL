/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

import { Context } from "@/cycle/context/Context";
import { packageUpdates, receiveBlob } from "@/cycles/data-update/blob-utils";
import { commitUpdates, getLeafObject, translateValue } from "@/cycles/data-update/data-update";
import { Update } from "@/types/Update";
import { extractBlobsFromPayload, includeBlobsInPayload } from "@dobuki/data-blob";
import { validatePayload } from "@dobuki/payload-validator";

export class Processor {
  constructor(private sendUpdate: (blob: Blob, context: Context) => void) {
  }

  performCycle(context: Context) {
    this.sendUpdateBlob(context);
    return commitUpdates(context.root, context.properties);
  }

  private async sendUpdateBlob(context: Context) {
    const blobs: Record<string, Blob> = {};
    const outgoingUpdates = context.root.outgoingUpdates;
    delete context.root.outgoingUpdates;
    if (outgoingUpdates) {
      //  Apply function to value
      for (let update of outgoingUpdates) {
        update.path = this.#fixPath(update.path, context);
        const previous = getLeafObject(context.root, update.path.split("/"), 0, false);
        const value = typeof update.value === "function" ? update.value(previous) : update.value;
        update.value = value;
      }

      //  Apply incoming updates
      const confirmedUpdates = outgoingUpdates.filter(update => update.value !== undefined)
        .map(update => ({ ...update }));
      this.#addIncomingUpdates(confirmedUpdates, context);

      //  send outgoing updates
      for (let update of outgoingUpdates) {
        update.value = await extractBlobsFromPayload(update.value, blobs);
      }
      const blob = packageUpdates(outgoingUpdates, blobs, context.secret);
      this.sendUpdate(blob, context);
    }
  }

  async processBlob(data: any | Blob, context: Context) {
    const { payload, blobs } = data instanceof Blob ? await receiveBlob(data) : { payload: typeof (data) === "string" ? JSON.parse(data) : data, blobs: {} };
    const secret = context.secret ?? payload.secret;
    if (secret) {
      if (!context.skipValidation && !validatePayload(payload, { secret })) {
        console.error("Invalid signature");
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
    if (payload?.state) {
      delete payload.state.signature;
      for (const key in payload.state) {
        context.root[key] = hasBlobs ? includeBlobsInPayload(payload.state[key], blobs) : payload.state[key];
      }
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
