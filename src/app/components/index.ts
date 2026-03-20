import { GraphicsComponent } from "./GraphicsComponent";
import { PeerComponent } from "./PeerComponent";
import { PingComponent } from "./PingComponent";
import { PointerLockComponent } from "./PointerLockComponent";
import { Registry } from "../../core/Registry";
import { WorkerComponent } from "./WorkerComponent";
import { ActivateOnClick } from "./ActivateOnClick";

export const registry = new Registry({
  PingComponent,
  GraphicsComponent,
  PeerComponent,
  WorkerComponent,
  PointerLockComponent,
  ActivateOnClick,
});
