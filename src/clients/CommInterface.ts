export interface OutgoingCom {
  send(data: Uint8Array, peer?: string): void;
}

export interface CommInterface extends OutgoingCom {
  close(): void;
  onMessage(listener: (data: ArrayBuffer) => void): () => void;
  onNewClient(listener: (peer: string) => void): () => void;
}
