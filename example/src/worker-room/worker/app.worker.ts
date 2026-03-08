/// <reference lib="webworker" />

import { MessageType } from "napl";
import { generateRandomHexColor } from "napl";
import { initialize } from "napl";

const cursor = {
  x: 0,
  y: 0,
  needsReset: true,
  color: "black",
  width: 1,
};

const {
  sendMessage: sendMessageUp,
  sendMessageAccross,
  getCanvas,
  enterRoom,
  addMessageListener,
} = initialize();

addMessageListener(MessageType.INIT, () => {
  const lobby = { room: "worker-test-room", host: "hello.dobuki.net" };
  enterRoom(lobby);
});
addMessageListener(MessageType.POINTER_LOCK, () => {
  cursor.needsReset = true;
  cursor.color = generateRandomHexColor();
});
addMessageListener(MessageType.LINE, (msg) => {
  const ctx = getCanvas()?.getContext("2d");
  if (ctx) {
    ctx.lineWidth = msg.lineWidth;
    ctx.beginPath();
    ctx.moveTo(msg.from.x, msg.from.y);
    ctx.strokeStyle = msg.color;
    ctx.lineTo(msg.to.x, msg.to.y);
    ctx.stroke();
  }
});
addMessageListener(MessageType.MOUSE_MOVE, (msg) => {
  if (cursor.needsReset) {
    cursor.x = msg.clientX * 2;
    cursor.y = msg.clientY * 2;
    cursor.needsReset = false;
  }
  const ctx = getCanvas()?.getContext("2d");

  if (ctx && (msg.movementX !== 0 || msg.movementY !== 0)) {
    const newLineWidth =
      Math.sqrt(
        Math.sqrt(
          msg.movementX * msg.movementX + msg.movementY * msg.movementY,
        ),
      ) * 2;
    ctx.lineWidth = newLineWidth;
    ctx.beginPath();
    ctx.moveTo(cursor.x, cursor.y);
    const from = { x: cursor.x, y: cursor.y };
    ctx.lineWidth = newLineWidth;
    cursor.x += msg.movementX;
    cursor.y += msg.movementY;
    cursor.x = Math.max(0, Math.min(ctx.canvas.width, cursor.x));
    cursor.y = Math.max(0, Math.min(ctx.canvas.height, cursor.y));
    ctx.strokeStyle = cursor.color;
    ctx.lineTo(cursor.x, cursor.y);
    ctx.stroke();

    sendMessageAccross({
      type: MessageType.LINE,
      from,
      to: { x: cursor.x, y: cursor.y },
      color: ctx.strokeStyle,
      lineWidth: ctx.lineWidth,
    });
  }
});
addMessageListener(MessageType.PING, (msg) => {
  console.log("Send message up from worker:", msg);
  sendMessageUp(MessageType.PING, msg);
});
