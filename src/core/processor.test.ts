import { createContext } from "../cycle/context/Context";
import { Data } from "../types/Data";
import { Processor } from "./Processor";

describe('Processor', () => {

  it('test update and databinding cycle', async () => {
    const processor = new Processor((u8) => {
      const data = u8.buffer.slice(u8.byteOffset, u8.byteOffset + u8.byteLength);
      processor.receivedData(data, context);
    });

    const root: Data = {
      type: 'test',
      abc: 123,
      array: [1, 2, 3],
    };
    const context = createContext(root);
    context.outgoingUpdates = [
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
    processor.performCycle(context);
    await new Promise((resolve) => setTimeout(resolve, 100));
    processor.performCycle(context);
    expect(root.abc).toBe(456);
    expect(root.array).toEqual([1, 5, 3]);
  })
});
