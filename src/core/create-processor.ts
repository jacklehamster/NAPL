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
    incomingUpdates: [],
    outgoingUpdates: [],
    properties,
  };
  const processor = new Processor((data, peer) => com.send(data, peer));
  com.onMessage(async (buffer) => {
    await processor.receivedData(buffer, context);
    prepareCycle();
  });
  com.onNewClient(peer => {
    Object.entries(root).forEach(([key, value]) => setDataCall(key, value, peer));
    prepareCycle();
  });

  const setDataCall = (path: string, value: any, peer?: string) => {
    setData(root, Date.now(), context.outgoingUpdates, path, value, {
      active: true,
      peer,
    });
  };

  let looping = false;
  let preparingCycle = false;
  let animationFrame = 0;
  function prepareCycle() {
    if (!preparingCycle) {
      preparingCycle = true;
      const loop = () => {
        if (looping) {
          animationFrame = requestAnimationFrame(loop);
        } else {
          preparingCycle = false;
        }
        processor.performCycle(context);
      };
      animationFrame = requestAnimationFrame(loop);
    }
  }

  return {
    processor,
    observe: (path: string | string[] | undefined) => {
      return processor.observe(path);
    },
    setData: (path: string, value: any, peer?: string) => {
      setDataCall(path, value, peer);
      prepareCycle();
    },
    close: () => {
      com.close();
    },
    startLoop() {
      looping = true;
      prepareCycle();
    },
    stopLoop() {
      cancelAnimationFrame(animationFrame);
      looping = false;
      preparingCycle = false;
    },
  };
}
