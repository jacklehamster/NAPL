import { CodeParser } from './CodeParser';
import { Registry } from '../../cycle/data/registry/Registry';
import { createCycleData, Context } from '../../cycle/context/Context';

describe('CodeParser', () => {
  it('should parse code', () => {
    const root = {
      type: 'test',
      abc: 123,
      testing: {
        data: "~{/abc}",
      },
    };

    const parser = new CodeParser();
    const cycleData = createCycleData(root)
    parser.performCycle(cycleData);
    expect(cycleData.registry.registryKeys()).toEqual(["", 'testing/data']);
    expect(cycleData.registry.record['testing/data']).toBeDefined();
    expect(cycleData.registry.record['testing/data']?.dataBinder).toBeDefined();
    expect(cycleData.registry.record['testing/data']?.dataBinder?.code).toEqual('/abc');
    expect(cycleData.registry.record['testing/data']?.parent).toEqual(root.testing);
  });
});
