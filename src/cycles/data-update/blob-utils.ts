import { Data } from "@/types/Data";
import { Update } from "@/types/Update";
import { BlobBuilder, extractPayload } from "@dobuki/data-blob";
import { signedPayload } from "@dobuki/payload-validator";
import { clearUpdates, commitUpdates } from "./data-update";

export function packageUpdates(updates: Update[], secret?: string): Blob {
  if (secret) {
    updates = updates.map(update => signedPayload(update, { secret }));
  }
  const blobBuilder = BlobBuilder.payload("payload", { updates });
  const addedBlob = new Set<string>();
  updates.forEach(update => {
    Object.entries(update.blobs ?? {}).forEach(([key, blob]) => {
      if (!addedBlob.has(key)) {
        blobBuilder.blob(key, blob);
        addedBlob.add(key);
      }
    });
  });
  return blobBuilder.build();
}

function saveBlobsFromUpdates(root: Data) {
  root.updates?.forEach(update => Object.entries(update.blobs ?? {}).forEach(([key, blob]) => {
    root.blobs ??= {};
    root.blobs[key] = blob;
  }));
}

export function applyUpdates(root: Data, properties: Record<string, any>): Record<string, any> | void {
  if (!root.updates?.length) {
    return;
  }
  saveBlobsFromUpdates(root);
  const updates: Record<string, any> = {};
  commitUpdates(root, properties, updates);
  clearUpdates(root, updates);
  return updates;
}

export async function processDataBlob(blob: Blob) {
  const { payload, ...blobs } = await extractPayload(blob);
  const updates: Update[] | undefined = payload.updates;
  updates?.forEach(update => {
    if (update.blobs) {
      for (let key in update.blobs) {
        update.blobs[key] = blobs[key];
      }
    }
  });
  return { payload, blobs };
}
