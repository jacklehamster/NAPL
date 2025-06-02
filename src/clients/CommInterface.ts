
export interface CommInterface {
  send(data: Uint8Array, peer?: string): void;
  close(): void;
  onMessage(listener: (data: ArrayBuffer) => void): void;
  onNewClient(listener: (peer: string) => void): void;
  onError?(listener: (event: Event) => void): void;
  onClose?(listener: () => void): void;
}
