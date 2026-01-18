export function hookPointerLock(onHook: () => () => void) {
  const TIME_DELAY = 1400;
  let exitedPointerLockTime = -TIME_DELAY;

  let timeout: ReturnType<typeof setTimeout>;
  async function enterPointerLock() {
    if (!document.activeElement) {
      document.body.focus();
      exitedPointerLockTime = performance.now();
      return;
    }

    document.body.style.cursor = "none";
    const unhook = onHook();
    const timeSinceExited = performance.now() - exitedPointerLockTime;
    function restore() {
      unhook();
      document.body.style.cursor = "auto";
      exitedPointerLockTime = performance.now();
    }

    clearTimeout(timeout);
    if (timeSinceExited < TIME_DELAY) {
      let hasExited = false;
      function detectExit() {
        hasExited = true;
        restore();
      }
      document.body.addEventListener("mouseleave", detectExit, { once: true });

      await new Promise<void>(
        (resolve) =>
          (timeout = setTimeout(resolve, TIME_DELAY - timeSinceExited))
      );
      document.body.removeEventListener("mouseleave", detectExit);
      if (hasExited) {
        return;
      }
    }
    try {
      console.log("HERE");
      await document.body.requestPointerLock();
    } catch (e) {
      console.warn(e);
      restore();
      return;
    }
    function onPointerLockChange() {
      if (document.pointerLockElement) {
        return;
      }
      restore();
      document.removeEventListener("pointerlockchange", onPointerLockChange);
    }
    document.addEventListener("pointerlockchange", onPointerLockChange);
    document.body.style.cursor = "auto";
  }

  return { enterPointerLock };
}
