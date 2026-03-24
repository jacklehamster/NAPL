export function ActivateOnClick({
  listener,
  element,
}: {
  listener: (element?: HTMLElement) => void;
  element?: HTMLElement;
}) {
  const elem = element ?? document;
  const callback = () => {
    listener(element);
  };
  elem.addEventListener("click", callback);

  return {
    stop: () => {
      elem.removeEventListener("click", callback);
    },
  };
}
