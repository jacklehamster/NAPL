import { Data } from "@/types/Data";
import { Update } from "@/types/Update";
import { BlobBuilder } from "@dobuki/data-blob";
import { signedPayload } from "@dobuki/payload-validator";
import { clearUpdates, commitUpdates } from "./data-update";

export function packageUpdates(updates: Update[], secret?: string): Blob {
  if (secret) {
    updates = updates.map(update => signedPayload(update, { secret }));
  }
  const blobBuilder = BlobBuilder.payload("payload", { updates });
  const addedBlob = new Set<string>();
  updates.forEach(update => {
    Object.entries(update?.blobs ?? {}).forEach(([key, blob]) => {
      if (!addedBlob.has(key)) {
        blobBuilder.blob(key, blob);
        addedBlob.add(key);
      }
    });
  });
  return blobBuilder.build();
}

export function saveBlobsFromUpdates(updates: Update[] | undefined, blobs: Record<string, Blob>) {
  updates?.forEach(update => Object.entries(update.blobs ?? {}).forEach(([key, blob]) => {
    blobs[key] = blob;
  }));
}

export function applyUpdates(root: Data, properties: Record<string, any>) {
  const blobs = root.blobs ?? (root.blobs = {});
  saveBlobsFromUpdates(root.updates, blobs);
  const updates: Record<string, any> = {};
  commitUpdates(root, properties, updates);
  // this.triggerObservers();
  clearUpdates(root, updates)
}
