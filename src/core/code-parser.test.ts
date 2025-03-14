import { CodeParser } from './CodeParser';
import { Registry } from './Registry';

describe('CodeParser', () => {
  it('should parse code', () => {
    const registry = new Registry();
    const root = {
      abc: 123,
      testing: {
        data: "~{/abc}",
      },
    };

    const parser = new CodeParser();
    parser.performCycle({ root, registry });
    expect(registry.registryKeys()).toEqual(['testing/data']);
    expect(registry.getRecord('testing/data')).toBeDefined();
    expect(registry.getRecord('testing/data')?.dataBinder).toBeDefined();
    expect(registry.getRecord('testing/data')?.dataBinder?.code).toEqual('/abc');
    expect(registry.getRecord('testing/data')?.dataBinder?.root).toEqual(root);
    expect(registry.getRecord('testing/data')?.dataBinder?.parts).toEqual(['testing', 'data']);
    expect(registry.getRecord('testing/data')?.parent).toEqual(root.testing);
    expect(registry.getRecord('testing/data')?.prop).toEqual('data');
  });
});
