export function ActivateOnClick({ listener }: { listener: () => void }) {
  document.addEventListener("mousedown", listener);

  return {
    close: () => {
      document.removeEventListener("mousedown", listener);
    },
  };
}
