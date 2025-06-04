import { Context } from "@/cycle/context/Context";
import { Data } from "@/types/Data";

export function createContext(root: Data = {}, properties: Record<string, any> = {}): Context {
  return {
    root,
    incomingUpdates: [],
    outgoingUpdates: [],
    properties,
  };
}
