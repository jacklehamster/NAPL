/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

import { decode, encode } from "@msgpack/msgpack";
import { Context } from "../context/Context";
import {
  commitUpdates,
  translateValue,
  UpdatePath,
} from "../cycles/data-update/data-update";
import { Payload } from "@/types/Payload";
import { OutgoingCom } from "@/clients/CommInterface";

export class Processor {
  private readonly outingCom = new Set<OutgoingCom>();

  connectComm(comm: OutgoingCom) {
    this.outingCom.add(comm);
    return () => {
      this.outingCom.delete(comm);
    };
  }

  performCycle(context: Context, updatedPaths: Map<string, UpdatePath>) {
    //  Send out outgoing updates
    this.sendOutgoingUpdate(context);
    //  Process incoming updates
    commitUpdates(context, updatedPaths);
  }

  receivedData(data: ArrayBufferLike, context: Context) {
    const payload = decode(data) as Payload;
    if (!payload.updates?.length) return;
    context.incomingUpdates.push(...payload.updates);
  }

  private sendOutgoingUpdate(context: Context) {
    if (!context.outgoingUpdates.length) return;
    //  Apply function to value
    context.outgoingUpdates.forEach((update) => {
      update.path = this.fixPath(update.path, context);
    });

    //  Apply incoming updates
    context.outgoingUpdates.forEach((update) => {
      if (update.confirmed) {
        context.incomingUpdates.push(update);
      }
    });

    //  send outgoing updates
    const peerSet = new Set<string | undefined>();
    context.outgoingUpdates.forEach((update) => peerSet.add(update.peer));

    peerSet.forEach((peer) => {
      this.outingCom.forEach((comm) => {
        comm.send(
          encode({
            updates: context.outgoingUpdates.filter(
              (update) => update.peer === peer,
            ),
          }),
          peer,
        );
      });
    });
    context.outgoingUpdates.length = 0;
  }

  private fixPath(path: string, context: Context) {
    const split = path.split("/");
    return split
      .map((part) => translateValue(part, context.properties))
      .join("/");
  }
}
