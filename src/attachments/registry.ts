import { Program } from "..";
import { Attachment } from "./Attachment";
import { Controlled } from "./Controlled";
import { Config as KeyboardAttachmentConfig, Keyboard } from "./Keyboard";
import { MomentumAttachment } from "./Momentum";
import { Slowdown } from "./SlowDown";
import { VizAttachment } from "./VizAttachments";
import { WallBounds } from "./WallBounds";
import { BallChainAttachment } from "./BallChain";

export const registry: Record<string, (config: any) => Attachment> = {
  Controlled: () => new Controlled(),
  Keyboard: (config: KeyboardAttachmentConfig) => new Keyboard(config),
  Momentum: () => new MomentumAttachment(),
  Slowdown: (amount: number) => new Slowdown(amount),
  Viz: () => new VizAttachment(),
  WallBounds: () => new WallBounds(),
  BallChain: (config: any) => new BallChainAttachment(config),
};
