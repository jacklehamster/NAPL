import { Context } from "@/cycle/context/Context";
import { Data } from "@/types/Data";
import { Processor } from "./Processor";
import { CommInterface } from "@/clients/CommInterface";
import { setData } from "@/cycles/data-update/data-manager";

export function createProcessor(
  com: CommInterface,
  root: Data = {},
  properties: Record<string, any> = {},
) {
  const context: Context = {
    root,
    outgoingUpdates: [],
    properties,
  };
  const processor = new Processor((blob, peer) => com.send(blob, peer));
  com.onMessage(async (blob) => {
    await processor.receivedBlob(blob, context);
    processor.performCycle(context);
  });
  com.addOnNewClient(peer => {
    Object.entries(root).forEach(([key, value]) => setDataCall(key, value, peer));
    processor.performCycle(context);
  });

  const setDataCall = (path: string, value: any, peer?: string) => {
    setData(root, Date.now(), context.outgoingUpdates, path, value, {
      active: true,
      peer,
    });
    processor.performCycle(context);
  };

  return {
    observe: (path: string | string[] | undefined) => processor.observe(path),
    setData: setDataCall,
  };
}
