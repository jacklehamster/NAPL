import { Data } from "@/types/Data";
import { Update } from "@/types/Update";
import { BlobBuilder } from "@dobuki/data-blob";
import { signedPayload } from "@dobuki/payload-validator";
import { clearUpdates, commitUpdates } from "./data-update";

export function packageUpdates(updates: Update[], blobs: Record<string, Blob>, secret?: string): Blob {
  if (secret) {
    updates = updates.map(update => signedPayload(update, { secret }));
  }
  const blobBuilder = BlobBuilder.payload("payload", { updates });
  const addedBlob = new Set<string>();

  for (let key in blobs) {
    if (!addedBlob.has(key)) {
      blobBuilder.blob(key, blobs[key]);
      addedBlob.add(key);
    }
  }
  return blobBuilder.build();
}

export function applyUpdates(root: Data, properties: Record<string, any>): Record<string, any> | void {
  if (!root.updates?.length) {
    return;
  }
  const updates: Record<string, any> = {};
  commitUpdates(root, properties, updates);
  clearUpdates(root, updates);
  return updates;
}
