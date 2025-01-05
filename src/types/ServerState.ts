import { ClientState } from "@/types/ClientState";

export interface RoomState {
  clients: Record<number, ClientState>;
}
