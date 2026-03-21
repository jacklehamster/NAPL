import { Data } from "@/napl";

export function ContextComponent(context: Record<string, Data>) {
  return {
    ...context,
    close: () => {},
  };
}
