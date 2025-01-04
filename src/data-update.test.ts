import { describe, expect, it } from 'bun:test';
import { commitUpdates } from './data-update';
import { Update } from './types/Update';
import { DataObject } from './types/DataObject';

describe('commitUpdates', () => {
  it('should sort updates by timestamp and apply them', () => {
    const updates: Update[] = [
      { timestamp: 2, path: 'a/b', value: 2, confirmed: true },
      { timestamp: 1, path: 'a/b', value: 1, confirmed: true },
    ];
    const obj: DataObject = {};

    commitUpdates(obj, updates);

    expect(obj).toEqual({ a: { b: 2 } });
  });
});
