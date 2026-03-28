import { GraphicsComponent } from "./GraphicsComponent";
import { PeerComponent } from "./PeerComponent";
import { PingComponent } from "./PingComponent";
import { PointerLockComponent } from "./PointerLockComponent";
import { Registry } from "../../core/Registry";
import { WorkerSabCommunicator } from "./WorkerSabCommunicator";
import { ActivateOnClick } from "./ActivateOnClick";
import { ContextComponent } from "./ContextComponent";
import { WorkerPostMessageComponent } from "./WorkerPostMessageComponent";
import { LoggerComponent } from "./LoggerComponent";
import { ActComponent } from "./ActComponent";
import { PendingActivation } from "./PendingActivation";
import { WorkerLoader } from "./WorkerLoader";

export const registry = new Registry({
  PingComponent,
  GraphicsComponent,
  PeerComponent,
  WorkerSabCommunicator,
  PointerLockComponent,
  ActivateOnClick,
  ContextComponent,
  WorkerPostMessageComponent,
  LoggerComponent,
  ActComponent,
  PendingActivation,
  WorkerLoader,
});
