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

    const parser = new CodeParser(registry)
    parser.parse([], root);
    expect(registry.getRecord('testing/data')).toBeDefined();
    expect(registry.registryKeys()).toEqual(["", "abc", "testing", 'testing/data']);
  });
});
