/// <reference lib="webworker" />

import { CommInterface } from "@/clients/CommInterface";
import { IProgram, Program } from "@/core/Program";
import { WorkerResponse } from "./WorkerResponse";
import { WorkerCommand } from "./WorkerCommand";
import { hookSerializers } from "@/app/utils/serializers";
import { BELL, READ, WRITE } from "@/app/core/messenger";
import { DataRingReader, IDataReader } from "@/app/utils/data-ring";
import { MessageType } from "@/app/MessageType";

function respond(response: WorkerResponse) {
  (self as DedicatedWorkerGlobalScope).postMessage(
    response,
    response.data ? [response.data] : []
  );
}

export function initialize(): void {
  let program: IProgram | undefined;
  const messageListeners = new Array<(data: Uint8Array) => void>();
  const newUserListener = new Array<(user: string) => void>();

  const { deserialize } = hookSerializers();

  let canvas: OffscreenCanvas | undefined;
  let cursor: { x: number; y: number; needsReset: boolean } = {
    x: 0,
    y: 0,
    needsReset: true,
  };

  function generateRandomHexColor() {
    // Generate a random number between 0 and 0xFFFFFF (16777215)
    let randomNum = Math.floor(Math.random() * 16777215);

    // Convert the number to a hexadecimal string
    let hexColor = randomNum.toString(16);

    // Pad the string with leading zeros if necessary to ensure it is 6 digits long
    let fullHexColor = hexColor.padStart(6, "0");

    return `#${fullHexColor.toUpperCase()}`; // Prepend '#' and convert to uppercase
  }

  async function listen(ctrl: Int32Array, data: IDataReader) {
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
      console.log({
        ...msg,
        type: msg ? MessageType[msg?.type] : "",
      });
      if (msg?.type === MessageType.POINTER_LOCK) {
        cursor.needsReset = true;
      }
      if (msg?.type === MessageType.MOUSE_MOVE) {
        if (cursor.needsReset) {
          cursor.x = msg.clientX * 2;
          cursor.y = msg.clientY * 2;
          cursor.needsReset = false;
        }
        const ctx = canvas?.getContext("2d");

        if (ctx) {
          ctx.lineWidth = 10;
          ctx.beginPath();
          ctx.moveTo(cursor.x, cursor.y);
          cursor.x += msg.movementX;
          cursor.y += msg.movementY;
          cursor.x = Math.max(0, Math.min(ctx.canvas.width, cursor.x));
          cursor.y = Math.max(0, Math.min(ctx.canvas.height, cursor.y));
          ctx.strokeStyle = generateRandomHexColor();
          ctx.lineTo(cursor.x, cursor.y);
          ctx.stroke();
        }
      }
    }
  }

  function drain(ctrl: Int32Array, data: IDataReader) {
    const r = Atomics.load(ctrl, READ);
    const w = Atomics.load(ctrl, WRITE);
    if (r === w) {
      return;
    }

    const msg = deserialize(data);
    if (r !== data.offset) {
      Atomics.store(ctrl, READ, data.offset);
    }
    return msg;
  }

  class CommInterfaceWorker implements CommInterface {
    constructor() {}
    send(data: Uint8Array, peer?: string): void {
      respond({ action: "send", data, peer });
    }
    close(): void {
      respond({ action: "close" });
    }
    onMessage(listener: (data: Uint8Array) => void): () => void {
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
    (
      e: MessageEvent<
        WorkerCommand & {
          sab?: SharedArrayBuffer;
          canvas?: OffscreenCanvas;
          width?: number;
          height?: number;
          dpr?: number;
        }
      >
    ) => {
      const msg = e.data;
      if (msg.sab) {
        const sab = msg.sab;
        const ctrl = new Int32Array(sab, 0, 8);
        const data = new DataRingReader(new Uint8Array(sab, 32));
        listen(ctrl, data);
        return;
      }
      if (msg.canvas) {
        canvas = msg.canvas;
        const { width, height, dpr } = msg;
        if (width && height) {
          canvas.width = width * (dpr ?? 1);
          canvas.height = height * (dpr ?? 1);
        }
        return;
      }
      if (msg.type === "resize") {
        if (canvas) {
          const dpr = msg.dpr ?? 1;
          canvas.width = msg.width * dpr;
          canvas.height = msg.height * dpr;
          return;
        }
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
        console.log(program);
      }
      //  else if (msg.type === "onMessage") {
      //   messageListeners.forEach((listener) => listener(msg.data));
      // } else if (msg.type === "onUserUpdate") {
      //   if (msg.action === "join") {
      //     newUserListener.forEach((listener) => listener(msg.user));
      //   } else if (msg.action === "leave") {
      //     program?.setData(`users/${msg.user}`, undefined);
      //   }
      // } else if (msg.type === "ping") {
      //   respond({ action: "ping", now: msg.now });
      // }
    }
  );
}
