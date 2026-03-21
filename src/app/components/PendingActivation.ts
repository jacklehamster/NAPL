export function PendingActivation() {
  const activationListeners = new Set<() => void>();
  return {
    activate() {
      activationListeners.forEach((callback) => callback());
      activationListeners.clear();
    },
    onActive(callback: () => void) {
      activationListeners.add(callback);
    },
    stop() {
      activationListeners.clear();
    },
  };
}
