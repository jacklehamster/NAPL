import { describe, expect, it } from 'bun:test';
import { clearUpdates, commitUpdates } from './data-update';
import { Update } from '../../types/Update';
import { Data } from '../../types/Data';

describe('commitUpdates', () => {
  it('should sort updates by confirmed timestamp and apply them', () => {
    const obj: Data = {
      updates: [
        { path: 'a/b', value: 2, confirmed: 2 },
        { path: 'a/b', value: 1, confirmed: 1 },
        { path: "test", value: "~{test}", confirmed: 3 },
      ],
    };

    commitUpdates(obj, {
      test: "123",
    });
    clearUpdates(obj);

    expect(obj).toEqual({ a: { b: 2 }, test: "123" });
  });

  it('should sort updates by confirmed timestamp and apply them', () => {
    const obj: Data = {
      updates: [
        { path: 'a/b', value: 2, confirmed: 2 },
        { path: 'a/b', value: 1, confirmed: 1 },
        { path: "test", value: "~{test}", confirmed: 3 },
      ],
    };

    const updates: Record<string, any> = {};
    commitUpdates(obj, {
      test: "123",
    });
    clearUpdates(obj);

    expect(obj).toEqual({
      a: {
        b: 2,
      },
      test: "123",
    });
  });
});
