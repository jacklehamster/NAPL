import { Context } from "@/cycle/context/Context";
import { packageUpdates, receiveBlob } from "@/cycles/data-update/blob-utils";
import { commitUpdates, translateValue } from "@/cycles/data-update/data-update";
import { Update } from "@/types/Update";
import { extractBlobsFromPayload, includeBlobsInPayload } from "@dobuki/data-blob";

export class Processor {
  constructor(private sendUpdate: (blob: Blob, context: Context) => void) {
  }

  performCycle(context: Context) {
    this.sendUpdateBlob(context);
    context.root.frame = (context.root.frame ?? 0) + 1;
    return commitUpdates(context.root, context.properties);
  }

  private async sendUpdateBlob(context: Context) {
    const blobs: Record<string, Blob> = {};
    const outgoingUpdates = context.root.outgoingUpdates;
    delete context.root.outgoingUpdates;
    if (outgoingUpdates) {
      for (let update of outgoingUpdates) {
        if (update) {
          update.path = this.#fixPath(update.path, context);
          const value = typeof update.value === "function" ? update.value(context.root) : update.value;
          update.value = await extractBlobsFromPayload(value, blobs);
        }
      }
      const blob = packageUpdates(outgoingUpdates, blobs, context.secret, context.clientId);
      this.sendUpdate(blob, context);
    }
  }

  async processBlob(blob: Blob, context: Context) {
    const { payload, blobs, secret } = await receiveBlob(blob, context.secret);
    if (secret) {
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
      context.root.updates = context.root.updates ?? [];
      context.root.updates.push(...payload.updates);
    }
    console.log("payload", payload);
  }

  #fixPath(path: string, context: Context) {
    const split = path.split("/");
    return split.map(part => translateValue(part, {
      self: context.clientId,
    })).join("/");
  }
}
