/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

import { decode, encode } from "@msgpack/msgpack";
import { Context } from "../context/Context";
import { commitUpdates, translateValue } from "../cycles/data-update/data-update";
import { Update } from "../types/Update";
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

  performCycle(context: Context) {
    //  Send out outgoing updates
    this.#sendOutgoingUpdate(context);
    //  Process incoming updates
    return commitUpdates(context.root, context.incomingUpdates, context.properties);
  }

  receivedData(data: ArrayBuffer | SharedArrayBuffer, context: Context) {
    const payload = decode(data) as Payload;
    this.#addIncomingUpdates(payload.updates, context);
  }

  #sendOutgoingUpdate(context: Context) {
    if (!context.outgoingUpdates.length) return;
    //  Apply function to value
    context.outgoingUpdates.forEach(update => {
      update.path = this.#fixPath(update.path, context);
    });

    //  Apply incoming updates
    const confirmedUpdates = context.outgoingUpdates.filter(({ confirmed }) => confirmed);
    this.#addIncomingUpdates(confirmedUpdates, context);

    //  send outgoing updates
    const peerSet = new Set<string | undefined>();
    context.outgoingUpdates.forEach(update => peerSet.add(update.peer));

    peerSet.forEach((peer) => {
      this.outingCom.forEach(comm => {
        comm.send(encode({
          updates: context.outgoingUpdates
            .filter(update => update.peer === peer)
        }), peer);
      });
    });
    context.outgoingUpdates.length = 0;
  }

  #addIncomingUpdates(updates: Update[] | undefined, context: Context) {
    if (!updates?.length) return;
    context.incomingUpdates.push(...updates);
    context.onIncomingUpdates?.(updates);
  }

  #fixPath(path: string, context: Context) {
    const split = path.split("/");
    return split.map(part => translateValue(part, context.properties)).join("/");
  }
}
