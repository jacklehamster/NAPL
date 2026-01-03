import { CommInterface } from "@/clients/CommInterface";
import { Context } from "@/context/Context";
import { Processor } from "../core/Processor";
import { setData } from "@/cycles/data-update/data-manager";
import { Data } from "@/types/Data";

export function deepShareData(
  context: Context,
  obj: Data,
  peerProps: { active: true; peer: string },
  pathParts: string[] = [],
  now: number = Date.now(),
) {
  const shouldGoDeep =
    typeof obj === "object" &&
    obj &&
    !(obj instanceof ArrayBuffer) &&
    Object.values(obj).length;
  if (shouldGoDeep) {
    for (let key in obj) {
      const value = Array.isArray(obj) ? obj[Number(key)] : obj[key];
      deepShareData(context, value, peerProps, [...pathParts, key], now);
    }
  } else {
    setData(now, context.outgoingUpdates, pathParts.join("/"), obj, peerProps);
  }
}

export function hookCommInterface(
  context: Context,
  comm: CommInterface,
  processor: Processor,
) {
  const removeOnMessage = comm.onMessage((buffer) => {
    processor.receivedData(buffer, context);
    context.onReceivedIncomingUpdates?.();
  });
  const removeOnNewClient = comm.onNewClient((peer) => {
    deepShareData(context, context.root, { active: true, peer });
  });
  const disconnectComm = processor.connectComm(comm);
  return {
    disconnect: () => {
      removeOnMessage();
      removeOnNewClient();
      disconnectComm();
    },
  };
}
