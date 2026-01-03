import { describe, expect, it, beforeEach } from 'bun:test';
import { cleanupRoot, commitUpdates, filterArray, UpdatePath } from './data-update';
import { Data } from '../../types/Data';

describe('commitUpdates', () => {
  let updatedPaths: Map<string, UpdatePath>;
  beforeEach(() => {
    updatedPaths = new Map();
  });

  it('should sort updates by confirmed timestamp and apply them', () => {
    const obj: Data = {};
    commitUpdates({ root: obj, incomingUpdates: [
        { path: 'a/b', value: 2, confirmed: 2 },
        { path: 'a/b', value: 1, confirmed: 1 },
        { path: "test", value: "~{test}", confirmed: 3 },
      ], properties: {
        test: "123",
      }, outgoingUpdates: [],
    }, updatedPaths, true);
    expect(obj).toEqual({ a: { b: 2 }, test: "123" });
    expect(Object.fromEntries([...updatedPaths.entries()].map(([key, update]) => [key, update.value]))).toEqual({
      a: {
        b: 2,
      },
      "a/b": 2,
      test: "123",
    });
  });

  it('should apply update when value is object', () => {
    const obj: Data = {};
    commitUpdates({root: obj, incomingUpdates: [
      { path: "abc", value: { a: 1 }, confirmed: 1 },
    ], properties: {}, outgoingUpdates: []}, updatedPaths, true);
    expect(obj).toEqual({ abc: { a: 1 } });
    expect(Object.fromEntries([...updatedPaths.entries()].map(([key, update]) => [key, update.value]))).toEqual({
      abc: { a: 1 },
    });
  })

  it('should delete element when value is undefined', () => {
    const obj: Data = {
      abc: 1,
    };
    commitUpdates({root: obj, incomingUpdates: [
      { path: "abc", value: undefined, confirmed: 1 },
    ], properties: {}, outgoingUpdates: []}, updatedPaths, true);
    expect(obj).toEqual({});
    expect(Object.fromEntries([...updatedPaths.entries()].map(([key, update]) => [key, update.value]))).toEqual({
      "abc": undefined,
      "": {},
    });
  });

  it('should sort updates by confirmed timestamp and apply them', () => {
    const obj: Data = {};

    commitUpdates({root: obj, incomingUpdates: [
      { path: 'a/b', value: 2, confirmed: 2 },
      { path: 'a/b', value: 1, confirmed: 1 },
      { path: "test", value: "~{test}", confirmed: 3 },
    ], properties: {
      test: "123",
    }, outgoingUpdates: []}, updatedPaths, true);

    expect(obj).toEqual({
      a: {
        b: 2,
      },
      test: "123",
    });
    expect(Object.fromEntries([...updatedPaths.entries()].map(([key, update]) => [key, update.value]))).toEqual({
        a: {
          b: 2,
        },
        "a/b": 2,
        test: "123",
    });
  });
});

describe('filterArray', () => {
  it('should filter array', () => {
    const array = [1, 2, 3, 4, 5, 6, 7, 8];
    filterArray(array, a => a % 2 === 0);
    expect(array).toEqual([2, 4, 6, 8]);
  });
});

describe('cleanupRoot', () => {
  let updatedPaths: Map<string, any>;
  beforeEach(() => {
    updatedPaths = new Map<string, any>();
  });

  it('should cleanup root', () => {
    const root: any = {
      test: {
        a: {
          c: {},
        },
        b: {
          c: {
            d: 1,
          }
        },
      },
    };
    cleanupRoot(root, ["test", "a", "c"], 0, updatedPaths, 1);
    expect(root).toEqual({
      test: {
        b: {
          c: {
            d: 1,
          }
        }
      }
    });
    expect(Object.fromEntries([...updatedPaths.entries()].map(([key, update]) => [key, update.value]))).toEqual({
      "test/a/c": undefined,
      "test/a": undefined,
      "test": {
        b: {
          c: {
            d: 1,
          },
        },
      },
    });
  });
});