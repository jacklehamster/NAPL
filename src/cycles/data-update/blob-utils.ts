import { Update } from "@/types/Update";
import { BlobBuilder } from "@dobuki/data-blob";

export function packageUpdates(updates: Update[], blobs: Record<string, Blob>, secret?: string): Blob {
  const blobBuilder = BlobBuilder.payload("payload", { updates }, secret);
  const addedBlob = new Set<string>();

  for (let key in blobs) {
    if (!addedBlob.has(key)) {
      blobBuilder.blob(key, blobs[key]);
      addedBlob.add(key);
    }
  }
  return blobBuilder.build();
}
