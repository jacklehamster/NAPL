/// <reference lib="webworker" />

import { CommInterface } from "@/clients/CommInterface";
import { IProgram, Program } from "@/core/Program";
import { WorkerResponse } from "./WorkerResponse";
import { WorkerCommand } from "./WorkerCommand";
import { hookSerializers } from "@/app/utils/serializers";
import { BELL, READ, WRITE } from "@/app/utils/messenger";

function respond(response: WorkerResponse) {
  (self as DedicatedWorkerGlobalScope).postMessage(
    response,
    response.data ? [response.data] : []
  );
}

export async function createProgram(): Promise<IProgram> {
  return new Promise<IProgram>((resolve) => {
    let program: Program | undefined;
    const messageListeners = new Array<(data: ArrayBuffer) => void>();
    const newUserListener = new Array<(user: string) => void>();

    const { deserialize } = hookSerializers();
    async function listen(ctrl: Int32Array, data: Uint8Array) {
      let lastBell = Atomics.load(ctrl, BELL);

      while (true) {
        // sleep until bell changes
        const result = Atomics.waitAsync(ctrl, BELL, lastBell, 8);
        await result.value;
        const bellNow = Atomics.load(ctrl, BELL);
        if (bellNow === lastBell) continue;
        lastBell = bellNow;

        // drain whatever is available
        const msg = drain(ctrl, data);
        console.log(msg);
      }
    }

    function drain(ctrl: Int32Array, data: Uint8Array) {
      const r = Atomics.load(ctrl, READ);
      const w = Atomics.load(ctrl, WRITE);
      if (r === w) {
        return;
      }

      const [msg, newR] = deserialize(data, r) ?? [undefined, 0];
      if (r !== newR) {
        Atomics.store(ctrl, READ, newR);
      }
      return msg;
    }

    class CommInterfaceWorker implements CommInterface {
      constructor() {}
      send(data: Uint8Array, peer?: string): void {
        respond({
          action: "send",
          data,
          peer,
        });
      }
      close(): void {
        respond({ action: "close" });
      }
      onMessage(listener: (data: ArrayBuffer) => void): () => void {
        messageListeners.push(listener);
        return () => {
          messageListeners.splice(messageListeners.indexOf(listener), 1);
        };
      }
      onNewClient(listener: (peer: string) => void): () => void {
        newUserListener.push(listener);
        return () => {
          newUserListener.splice(newUserListener.indexOf(listener), 1);
        };
      }
    }

    self.addEventListener(
      "message",
      (e: MessageEvent<WorkerCommand & { sab?: SharedArrayBuffer }>) => {
        const msg = e.data;
        if (msg.sab) {
          const sab = msg.sab;
          const ctrl = new Int32Array(sab, 0, 8);
          const data = new Uint8Array(sab, 32);
          listen(ctrl, data);

          return;
        }
        if (msg.type === "createApp") {
          if (program) {
            throw new Error("Can only create program once");
          }
          program = new Program({
            appId: msg.appId,
            userId: msg.userId,
            comm: new CommInterfaceWorker(),
          });
          resolve(program);
        } else if (msg.type === "onMessage") {
          messageListeners.forEach((listener) => listener(msg.data));
        } else if (msg.type === "onUserUpdate") {
          if (msg.action === "join") {
            newUserListener.forEach((listener) => listener(msg.user));
          } else if (msg.action === "leave") {
            program?.setData(`users/${msg.user}`, undefined);
          }
        } else if (msg.type === "ping") {
          respond({ action: "ping", now: msg.now });
        }
      }
    );
  });
}
