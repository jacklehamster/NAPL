import { ClientState } from "@/types/ClientState";
import { Config } from "./Config";
import { Data } from "./Data";

export interface RoomState extends Data {
  clients?: Record<string, ClientState>;
  peer?: Record<string, any>;
  config?: Config;
}
