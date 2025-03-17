import { createContext } from "../cycle/context/Context";
import { Data } from "../types/Data";
import { Processor } from "./Processor";

describe('Processor', () => {

  it('test update and databinding cycle', () => {
    const processor = new Processor();

    const root: Data = {
      type: 'test',
      abc: 123,
      array: [1, 2, 3],
    };
    const cycleData = createContext(root);
    pushUpdate(root,
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
    processor.performCycle(cycleData);
    expect(root.abc).toBe(456);
    expect(root.array).toEqual([1, 5, 3]);
  })
});
function pushUpdate(root: Data, arg1: { path: string; value: number; confirmed: number; }, arg2: { path: string; value: number; confirmed: number; }) {
  throw new Error("Function not implemented.");
}
