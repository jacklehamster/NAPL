import { LineMessage, Message, MessageType } from "../../app/MessageType";
import { MessageHandler } from "./OnMessageComponent";

export function LineDrawComponent({
  onMessage,
  getCanvas,
}: {
  onMessage: <M extends Message>(
    type: MessageType,
    callback: MessageHandler<M>,
  ) => () => void;
  getCanvas: () => OffscreenCanvas | undefined;
}) {
  onMessage<LineMessage>(MessageType.LINE, (msg) => {
    const ctx = getCanvas()?.getContext("2d");
    if (ctx) {
      const { from, to } = msg;
      ctx.lineWidth = to.width;
      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.strokeStyle = to.color;
      ctx.lineTo(to.x, to.y);
      ctx.stroke();
    }
  });

  return {
    stop() {},
  };
}
