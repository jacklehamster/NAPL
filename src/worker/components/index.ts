import { Registry } from "@/core/Registry";
import { RoomComponent } from "./RoomComponent";
import { PingBackComponent } from "./PingBackComponent";
import { EnterRoomComponent } from "./EnterRoomComponent";
import { OnMessageComponent } from "./OnMessageComponent";
import { LineDrawComponent } from "./LineDrawComponent";
import { Serializers } from "./Serializers";
import { PeerCommunicator } from "./PeerCommunicator";
import { CursorComponent } from "./CursorComponent";
import { MoveCursor } from "./MoveCursor";
import { CrossMessageSender } from "./CrossMessageSender";
import { HookListener } from "./HookListener";
import { LineDrawer } from "./LineDrawer";
import { WorkerMessageListener } from "./WorkerMessageListener";
import { SharedArrayBufferListener } from "./SharedArrayBufferListener";
import { WorkerCanvas } from "./WorkerCanvas";

export const workerRegistry = new Registry({
  RoomComponent,
  PingBackComponent,
  EnterRoomComponent,
  OnMessageComponent,
  LineDrawComponent,
  Serializers,
  PeerCommunicator,
  CursorComponent,
  MoveCursor,
  CrossMessageSender,
  HookListener,
  LineDrawer,
  WorkerMessageListener,
  SharedArrayBufferListener,
  WorkerCanvas,
});
