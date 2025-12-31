import { CommInterface } from "@/clients/CommInterface";
import { Context } from "@/context/Context";
import { Processor } from "../core/Processor";
import { setData } from "@/cycles/data-update/data-manager";
import { Connection } from "@/connections/Connection";

export function hookCommInterface(context: Context, comm: CommInterface, processor: Processor): Connection {
  const removeOnMessage = comm.onMessage(buffer => {
    processor.receivedData(buffer, context);
  });
  const removeOnNewClient = comm.onNewClient(peer => {
    Object.entries(context.root).forEach(([key, value]) => {
      setData(Date.now(), context.outgoingUpdates, key, value, {
        active: true,
        peer,
      });
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
