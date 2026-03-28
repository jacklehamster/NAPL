export function hookPointerLock(onHook: () => () => void) {
  const TIME_DELAY = 1400;
  let exitedPointerLockTime = -TIME_DELAY;
  let timeout: ReturnType<typeof setTimeout> | undefined;

  function ensureFocus(elem: HTMLElement) {
    if (!document.activeElement) {
      elem.focus();
      exitedPointerLockTime = performance.now();
      return true;
    }
    return false;
  }

  async function waitForPointerLockExit(elem: HTMLElement) {
    const timeSinceExited = performance.now() - exitedPointerLockTime;
    clearTimeout(timeout);
    if (timeSinceExited < TIME_DELAY) {
      let hasExited = false;
      function detectExit() {
        hasExited = true;
      }
      elem.addEventListener("mouseleave", detectExit, { once: true });

      await new Promise<void>(
        (resolve) =>
          (timeout = setTimeout(resolve, TIME_DELAY - timeSinceExited)),
      );
      timeout = undefined;
      elem.removeEventListener("mouseleave", detectExit);
      if (hasExited) {
        return false;
      }
    }
    return true;
  }

  async function enterPointerLock(passedElem?: HTMLElement) {
    const elem = passedElem ?? document.body;
    if (ensureFocus(elem)) {
      return;
    }
    if (timeout) return;

    elem.style.cursor = "none";
    //  Hook
    const unhook = onHook();
    const restore = () => {
      unhook();
      elem.style.cursor = "auto";
      exitedPointerLockTime = performance.now();
    };

    //  Wait until pointer lock is available
    const shouldContinue = await waitForPointerLockExit(elem);
    if (!shouldContinue) {
      restore();
      return;
    }

    //  Enter pointer lock
    try {
      await elem.requestPointerLock();
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
    elem.style.cursor = "auto";
  }

  return { enterPointerLock };
}
