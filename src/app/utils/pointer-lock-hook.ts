export function hookPointerLock(onHook: () => () => void) {
  const TIME_DELAY = 1400;
  let exitedPointerLockTime = -TIME_DELAY;
  let timeout: ReturnType<typeof setTimeout> | undefined;

  function ensureFocus() {
    if (!document.activeElement) {
      document.body.focus();
      exitedPointerLockTime = performance.now();
      return true;
    }
    return false;
  }

  async function waitForPointerLockExit() {
    const timeSinceExited = performance.now() - exitedPointerLockTime;
    clearTimeout(timeout);
    if (timeSinceExited < TIME_DELAY) {
      let hasExited = false;
      function detectExit() {
        hasExited = true;
      }
      document.body.addEventListener("mouseleave", detectExit, { once: true });

      await new Promise<void>(
        (resolve) =>
          (timeout = setTimeout(resolve, TIME_DELAY - timeSinceExited)),
      );
      timeout = undefined;
      document.body.removeEventListener("mouseleave", detectExit);
      if (hasExited) {
        return false;
      }
    }
    return true;
  }

  async function enterPointerLock() {
    if (ensureFocus()) {
      return;
    }
    if (timeout) return;

    document.body.style.cursor = "none";
    //  Hook
    const unhook = onHook();
    const restore = () => {
      unhook();
      document.body.style.cursor = "auto";
      exitedPointerLockTime = performance.now();
    };
    //  Wait until pointer lock is available
    const shouldContinue = await waitForPointerLockExit();
    if (!shouldContinue) {
      restore();
      return;
    }
    //  Enter pointer lock
    try {
      await document.body.requestPointerLock();
    } catch (e) {
      console.warn(e);
      restore();
      return;
    }
    function onPointerLockChange() {
      if (document.pointerLockElement) return;
      restore();
      document.removeEventListener("pointerlockchange", onPointerLockChange);
    }
    document.addEventListener("pointerlockchange", onPointerLockChange);
    document.body.style.cursor = "auto";
  }

  return { enterPointerLock };
}
