export interface OutgoingCom {
  send(data: ArrayBufferView, peer?: string): void;
}

export interface CommInterface extends OutgoingCom {
  close(): void;
  onMessage(listener: (data: ArrayBufferLike) => void): () => void;
  onNewClient(listener: (peer: string) => void): () => void;
}
