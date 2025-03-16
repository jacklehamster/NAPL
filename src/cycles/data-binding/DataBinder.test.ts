import { Observer } from '../../cycle/data/observer/Observer';
import { RegistryEntry } from '../../cycle/data/registry/RegistryEntry';
import { DataBinder } from './DataBinder';

describe('DataBinder', () => {
  let observers: Record<string, Observer[]>;
  let registryEntry: RegistryEntry;

  beforeEach(() => {
    observers = {};
    registryEntry = {
      path: 'parent/child',
      parent: {},
      dataBinder: null
    } as RegistryEntry;
  });

  it('should initialize and add registryEntry to observers', () => {
    const code = 'testCode';
    const dataBinder = new DataBinder(code, registryEntry, observers);

    const expectedPath = `${registryEntry.path}/${code}`;
    expect(observers[expectedPath]).toEqual([
      { registry: registryEntry },
    ]);
    expect(registryEntry.dataBinder).toBe(dataBinder);
  });

  it('should update the value in the parent object', () => {
    const code = 'testCode';
    const dataBinder = new DataBinder(code, registryEntry, observers);
    const newValue = 'newValue';

    dataBinder.update(newValue);

    expect(registryEntry.parent['child']).toBe(newValue);
  });

  it('should update the value in the parent array', () => {
    registryEntry.path = 'parent/0';
    registryEntry.parent = ['oldValue'];
    const code = 'testCode';
    const dataBinder = new DataBinder(code, registryEntry, observers);
    const newValue = 'newValue';

    dataBinder.update(newValue);

    expect(registryEntry.parent[0]).toBe(newValue);
  });
});
