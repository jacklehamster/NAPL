import { CommInterface } from "@/clients/CommInterface";
import { Context } from "@/context/Context";
import { Processor } from "../core/Processor";
import { setData } from "@/cycles/data-update/data-manager";
import { Data } from "@/types/Data";

function deepShareData(context: Context, pathParts: string[], obj: Data, peer: string, now: number, peerProps: { active: true; peer: string }) {
  if (typeof obj === "object" && obj && Object.values(obj).length) {
    Object.entries(obj).forEach(([key, value]) => {
      deepShareData(context, [...pathParts,key], value, peer, now, peerProps);
    });
  } else {
    setData(now, context.outgoingUpdates, pathParts.join("/"), obj, peerProps);
  }
}

export function hookCommInterface(context: Context, comm: CommInterface, processor: Processor) {
  const removeOnMessage = comm.onMessage(buffer => {
    processor.receivedData(buffer, context);
  });
  const removeOnNewClient = comm.onNewClient(peer => {
    deepShareData(context, [], context.root, peer, Date.now(), { active: true, peer });
  });
  const disconnectComm = processor.connectComm(comm);
  return {
    disconnect: () => {
      removeOnMessage();
      removeOnNewClient();
      disconnectComm();
    },
  }
}
