import { describe, expect, it } from 'bun:test';
import { commitUpdates } from './data-update';
import { Data } from '../../types/Data';

describe('commitUpdates', () => {
  it('should sort updates by confirmed timestamp and apply them', () => {
    const obj: Data = {};

    commitUpdates(obj, [
      { path: 'a/b', value: 2, confirmed: 2 },
      { path: 'a/b', value: 1, confirmed: 1 },
      { path: "test", value: "~{test}", confirmed: 3 },
    ], {
      test: "123",
    });

    expect(obj).toEqual({ a: { b: 2 }, test: "123" });
  });

  it('should apply update when value is object', () => {
    const obj: Data = {};
    commitUpdates(obj, [
      { path: "abc", value: { a: 1 }, confirmed: 1 },
    ], {});
    expect(obj).toEqual({ abc: { a: 1 } });
  })

  it('should delete element when value is undefined', () => {
    const obj: Data = {
      abc: 1,
    };
    commitUpdates(obj, [
      { path: "abc", value: undefined, confirmed: 1 },
    ], {});
    expect(obj).toEqual({});
  });

  it('should sort updates by confirmed timestamp and apply them', () => {
    const obj: Data = {};

    commitUpdates(obj, [
      { path: 'a/b', value: 2, confirmed: 2 },
      { path: 'a/b', value: 1, confirmed: 1 },
      { path: "test", value: "~{test}", confirmed: 3 },
    ], {
      test: "123",
    });

    expect(obj).toEqual({
      a: {
        b: 2,
      },
      test: "123",
    });
  });
});
