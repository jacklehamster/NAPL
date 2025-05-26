
export interface CommInterface {
  send(data: string | ArrayBufferLike | Blob | ArrayBufferView, peer?: string): void;
  onMessage(listener: (data: any) => void): void;
  onNewClient(listener: (peer: string) => void): void;
  onError?(listener: (event: Event) => void): void;
  onClose?(listener: () => void): void;
  close?(): void;
}
