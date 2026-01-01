import { CommInterface } from "@/clients/CommInterface";
import { Context } from "@/context/Context";
import { Processor } from "../core/Processor";
import { setData } from "@/cycles/data-update/data-manager";

export function hookCommInterface(context: Context, comm: CommInterface, processor: Processor) {
  const removeOnMessage = comm.onMessage(buffer => {
    processor.receivedData(buffer, context);
  });
  const removeOnNewClient = comm.onNewClient(peer => {
    const peerProps = { active: true, peer };
    const now = Date.now();
    Object.entries(context.root).forEach(([key, value]) => {
      setData(now, context.outgoingUpdates, key, value, peerProps);
    });
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
