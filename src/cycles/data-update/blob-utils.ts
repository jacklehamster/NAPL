import { Payload } from "@/types/Payload";
import { Update } from "@/types/Update";
import { BlobBuilder, extractPayload } from "@dobuki/data-blob";
import { validatePayload } from "@dobuki/payload-validator";

export function packageUpdates(updates: Update[], blobs: Record<string, Blob>, secret?: string, sender?: string): Blob {
  const blobBuilder = BlobBuilder.payload("payload", { updates, sender }, secret);
  const addedBlob = new Set<string>();

  for (let key in blobs) {
    if (!addedBlob.has(key)) {
      blobBuilder.blob(key, blobs[key]);
      addedBlob.add(key);
    }
  }
  return blobBuilder.build();
}

type BlobContent = { payload: Payload } & Record<string, Blob>;

export async function receiveBlob(blob: Blob) {
  const { payload, ...blobs } = await extractPayload<BlobContent>(blob);
  return { payload, blobs };
}
