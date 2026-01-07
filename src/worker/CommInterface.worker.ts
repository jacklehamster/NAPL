/// <reference lib="webworker" />

import { CommInterface } from "@/clients/CommInterface";
import { IProgram, Program } from "@/core/Program";
import { IObserver } from "@/observer/Observer";
import { Data } from "@/types/Data";

export type WorkerResponse =
  | {
      action: "send";
      data: Uint8Array;
      peer: string | undefined;
    }
  | ({ data?: undefined } & (
      | { action: "close" }
      | { action: "enterRoom"; room: string; host: string }
      | { action: "exitRoom"; room: string; host: string }
    ));

function respond(response: WorkerResponse) {
  (self as DedicatedWorkerGlobalScope).postMessage(
    response,
    response.data ? [response.data] : []
  );
}

export type WorkerCommand =
  | {
      type: "onUserUpdate";
      user: string;
      action: string;
      users: string[];
      data?: undefined;
    }
  | { type: "onMessage"; data: any; from: string }
  | { type: "createApp"; userId: string; appId: string; data?: undefined };

function createProgram(): IProgram {
  let program: Program;
  const messageListeners = new Array<(data: ArrayBuffer) => void>();
  const newUserListener = new Array<(user: string) => void>();

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

  self.addEventListener("message", (e: MessageEvent<WorkerCommand>) => {
    const msg = e.data;
    if (msg.type === "createApp") {
      program = new Program({
        appId: msg.appId,
        userId: msg.userId,
        comm: new CommInterfaceWorker(),
      });
    } else if (msg.type === "onMessage") {
      messageListeners.forEach((listener) => listener(msg.data));
    } else if (msg.type === "onUserUpdate") {
      if (msg.action === "join") {
        newUserListener.forEach((listener) => listener(msg.user));
      } else if (msg.action === "leave") {
        program.setData(`users/${msg.user}`, undefined);
      }
    }
  });
  return {
    performCycle: function (): void {
      throw new Error("Function not implemented.");
    },
    observe: function (paths?: string[] | string): IObserver {
      throw new Error("Function not implemented.");
    },
    setData: function (path: string, value: Data | undefined): void {
      throw new Error("Function not implemented.");
    },
    close: function (): void {
      throw new Error("Function not implemented.");
    },
  };
}
