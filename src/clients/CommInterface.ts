
export interface CommInterface {
  send(data: Blob, peer?: string): void;
  close(): void;
  onMessage(listener: (data: any) => void): void;
  onNewClient(listener: (peer: string) => void): void;
  onError?(listener: (event: Event) => void): void;
  onClose?(listener: () => void): void;
}
