import { OutgoingCom } from "../clients/CommInterface";
import { Context, createContext } from "../context/Context";
import { Data } from "../types/Data";
import { Processor } from "./Processor";

describe('Processor', () => {
  let processor: Processor | undefined;
  let outgoingComm: OutgoingCom | undefined;
  let context: Context | undefined;

  beforeEach(() => {
    const root: Data = {
      type: 'test',
      abc: 123,
      array: [1, 2, 3],
    };
    const ctx = createContext(root);
    processor = new Processor();
    outgoingComm = {
      send(u8) {
        const data = u8.buffer.slice(u8.byteOffset, u8.byteOffset + u8.byteLength);
        processor?.receivedData(data, ctx);
      }
    };
    context = ctx;
  });

  it('test update and databinding cycle', async () => {
    context?.outgoingUpdates.push(
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
    );
    processor?.performCycle(context!);
    await new Promise((resolve) => setTimeout(resolve, 100));
    processor?.performCycle(context!);
    expect(context!.root.abc).toBe(456);
    expect(context!.root.array).toEqual([1, 5, 3]);
  })
});
