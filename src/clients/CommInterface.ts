
export interface CommInterface {
  send(data: string | ArrayBufferLike | Blob | ArrayBufferView, peer?: string): void;
  onMessage(listener: (data: any) => void): void;
  onError(listener: (event: Event) => void): void;
  onClose(listener: () => void): void;
  addOnNewClient(listener: (peer: string) => void): void;
  close(): void;
}
