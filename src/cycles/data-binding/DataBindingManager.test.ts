import { createCycleData, Context } from '../../cycle/context/Context';
import { Observer } from '../../cycle/data/observer/Observer';
import { Data } from '../../types/Data';
import { CodeParser } from '../code-parser/CodeParser';
import { DataBindingManager } from './DataBindingManager';
import { DataUpdateManager } from '../data-update/DataUpdateManager';

describe('DataBindingManager', () => {
  let dataBindingManager: DataBindingManager;
  let dataUpdater: DataUpdateManager;
  let root: Data;
  let cycleData: Context;

  beforeEach(() => {
    dataBindingManager = new DataBindingManager();
    dataUpdater = new DataUpdateManager();
    root = {
      type: 'test',
      abc: 123,
      testing: {
        data: "~{/abc}",
      },
    };
    cycleData = createCycleData(root);
    cycleData.updatedPaths = {
      'path1': 'value1',
      'path2': 'value2'
    };
    cycleData.observers = {
      'path1': [
        { registry: { dataBinder: { update: jest.fn() } } } as Observer
      ],
      'path2': [
        { registry: { dataBinder: { update: jest.fn() } } } as Observer
      ]
    };
  });

  it('should call update on each observer\'s dataBinder with the correct value', () => {
    dataBindingManager.performCycle(cycleData);

    expect(cycleData.observers['path1'][0].registry.dataBinder.update).toHaveBeenCalledWith('value1');
    expect(cycleData.observers['path2'][0].registry.dataBinder.update).toHaveBeenCalledWith('value2');
  });

  it('should not throw if there are no observers for a path', () => {
    cycleData.updatedPaths['path3'] = 'value3';
    expect(() => dataBindingManager.performCycle(cycleData)).not.toThrow();
  });

  it('should apply databinding properly', () => {
    const root: Data = {
      type: 'test',
      abc: 123,
      array: [1, 2, 3],
      testing: {
        data: "~{/abc}",
      },
    };
    const cycleData = createCycleData(root);
    const codeParser = new CodeParser();
    codeParser.performCycle(cycleData);
    root.updates = [
      {
        path: 'abc',
        value: 456,
        confirmed: 1,
      },
      {
        path: "array/1",
        value: 5,
        confirmed: 2,
      }
    ];
    dataUpdater.performCycle(cycleData);
    dataBindingManager.performCycle(cycleData);
    expect(root.testing.data).toBe(456);
    expect(root.array).toEqual([1, 5, 3]);
  })
});
