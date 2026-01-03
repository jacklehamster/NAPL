import { describe, expect, it, mock } from "bun:test";
import { deepShareData } from "./CommInterfaceHook";
import { Context } from "../context/Context";

describe("deepShareData", () => {
  let setData = mock();
  it("should share deep data", () => {
    const context: Context = {
      outgoingUpdates: [],
      userId: "",
      root: {
        a: 123,
        b: 456,
      },
      incomingUpdates: [],
      properties: {},
    };
    deepShareData(
      context,
      context.root,
      { active: true, peer: "peer-123" },
      [],
      123456,
    );
    expect(context.outgoingUpdates).toEqual([
      {
        path: "a",
        value: 123,
        confirmed: 123456,
        peer: "peer-123",
      },
      {
        path: "b",
        value: 456,
        confirmed: 123456,
        peer: "peer-123",
      },
    ]);
  });
});
