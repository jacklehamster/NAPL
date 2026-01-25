function isEqualDeps(
  deps1: readonly unknown[],
  deps2: readonly unknown[],
): boolean {
  if (deps1.length !== deps2.length) {
    return false;
  }
  for (let i = 0; i < deps1.length; i++) {
    if (Object.is(deps1[i], deps2[i])) {
      return false;
    }
  }
  return true;
}

type SetState<T> = (value: T | ((prev: T) => T)) => void;
type StateHook<T> = [T, SetState<T>];

type EffectSlot = {
  deps?: readonly unknown[];
  cleanup?: () => void;
  pending?: () => void | (() => void);
};

interface HookSetup {
  render: () => void;
  effectIndex: number;
  effects: Array<EffectSlot>;
  stateIndex: number;
  states: Array<StateHook<any>>;
  memoIndex: number;
  memos: Array<{ value: any; deps?: readonly unknown[] }>;
  scheduleReset: () => void;
  isRendering?: boolean;
}

const DEFAULT_HOOK_SETUP: HookSetup = {
  render: () => {},
  effectIndex: 0,
  effects: [],
  stateIndex: 0,
  states: [],
  memoIndex: 0,
  memos: [],
  scheduleReset: () => {},
};

let hookSetup: HookSetup = DEFAULT_HOOK_SETUP;

function assertRendering(hooks: HookSetup) {
  if (!hooks.isRendering) {
    throw new Error("Hooks can only be called during render()");
  }
}

function runWithHooks(hooks: HookSetup) {
  const prev = hookSetup;
  hookSetup = hooks;
  try {
    hooks.effectIndex = hooks.stateIndex = hooks.memoIndex = 0;
    hooks.isRendering = true;
    hooks.render();

    // cleanup effects that disappeared (optional)
    for (let i = hooks.effectIndex; i < hooks.effects.length; i++) {
      hooks.effects[i]?.cleanup?.();
    }
    hooks.effects.length = hooks.effectIndex;
    hooks.states.length = hooks.stateIndex;
    hooks.memos.length = hooks.memoIndex;

    flushEffects(hooks);
  } finally {
    hooks.isRendering = false;
    hookSetup = prev;
  }
}

function flushEffects(hooks: HookSetup) {
  for (const e of hooks.effects) {
    if (e.pending) {
      e.cleanup?.(); // cleanup previous
      const cleanup = e.pending(); // run next
      e.cleanup = cleanup ?? undefined;
      e.pending = undefined;
    }
  }
}

export function startHook(callback: () => void): () => void {
  let timeout = 0;
  function scheduleReset() {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      reset(false, hooks);
    }, 0) as unknown as number;
  }

  const hooks: HookSetup = {
    render: callback,
    effectIndex: 0,
    effects: [],
    stateIndex: 0,
    states: [],
    memoIndex: 0,
    memos: [],
    scheduleReset,
  };

  runWithHooks(hooks);
  return () => {
    clearTimeout(timeout);
    reset(true, hooks);
  };
}

function reset(shutDown: boolean, hooks: HookSetup) {
  hooks.effectIndex = 0;
  hooks.stateIndex = 0;
  hooks.memoIndex = 0;
  if (!shutDown) {
    runWithHooks(hooks);
  } else {
    hooks.effects.forEach((effect) => {
      effect.cleanup?.();
    });
    hooks.memos.length = 0;
    hooks.states.length = 0;
    hooks.effects.length = 0;
  }
}

export function hookEffect(
  callback: () => void | (() => void),
  deps: readonly unknown[],
): void {
  const hooks = hookSetup;
  assertRendering(hooks);

  const i = hooks.effectIndex++;

  const slot: EffectSlot = hooks.effects[i] ?? {};
  const depsChanged = !slot.deps || !isEqualDeps(slot.deps, deps);

  if (depsChanged) {
    slot.deps = deps.slice();
    slot.pending = callback; // don’t run now
  }

  hooks.effects[i] = slot;
}

export function hookState<T>(initialValue: T): StateHook<T> {
  const hooks = hookSetup;
  assertRendering(hooks);
  const currentIndex = hooks.stateIndex;
  console.log(">>", currentIndex, hooks.states[currentIndex]?.[0]);
  if (!hooks.states[currentIndex]) {
    const stateHook: StateHook<T> = [
      initialValue,
      (newValue: T | ((prev: T) => T)) => {
        const previous = stateHook[0];
        if (typeof newValue === "function") {
          stateHook[0] = (newValue as (prev: T) => T)(previous);
        } else {
          stateHook[0] = newValue;
        }
        if (previous !== stateHook[0]) {
          hooks.scheduleReset();
        }
      },
    ];
    hooks.states[currentIndex] = stateHook;
  }
  hooks.stateIndex++;
  return hooks.states[currentIndex];
}

export function hookMemo<T>(factory: () => T, deps: readonly unknown[]): T {
  const hooks = hookSetup;
  assertRendering(hooks);
  const currentIndex = hooks.memoIndex++;

  const slot = hooks.memos[currentIndex];

  if (!slot) {
    const value = factory();
    hooks.memos[currentIndex] = { value, deps: deps.slice() };
    console.log("NOW MEMO", currentIndex, value);
    return value;
  }

  const memo = slot;
  if (!memo.deps || !isEqualDeps(memo.deps, deps)) {
    memo.value = factory();
    memo.deps = deps.slice();
  }
  console.log("MEMO", currentIndex, memo.value);
  return memo.value;
}

export function hookCallback<T extends (...args: any[]) => any>(
  callback: T,
  deps: readonly unknown[],
): T {
  return hookMemo(() => callback, deps);
}

export function hookRef<T>(initialValue: T): { current: T } {
  const [ref] = hookState<{ current: T }>({ current: initialValue });
  return ref;
}
