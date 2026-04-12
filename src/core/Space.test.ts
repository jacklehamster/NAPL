import { describe, it, expect } from "vitest";
import "bun";

import { deploy, Val } from "./Space";
import { vars } from "../spaces/vars";
import { exportSpace } from "../spaces/export";
import { makeVar, bindVar } from "../utils/var-utils";

describe("Space", () => {
  it("test export", () => {
    let testResult;
    function Chicken() {
      return {
        uuid: "<uuid>",
      };
    }
    function Egg({ uuid }: { uuid: Val<string> }) {
      return {
        msg: "Laid from chicken " + uuid.val,
      };
    }
    function Test({ msg }: { msg: Val<string> }) {
      testResult = msg.val;
    }

    const space = deploy(null, {}, () => {
      deploy(Chicken, { id: "sanders", test: 123 }, ({ result: { uuid } }) => {
        const {
          result: { msg },
        } = deploy(Egg, { id: "eggy", uuid });
        deploy(Test, { msg });
      });
    });

    expect(testResult).toBe("Laid from chicken <uuid>");
    console.dir(exportSpace(space), { depth: null });
    console.dir(exportSpace(space, true), { depth: null });
    console.log(Bun.YAML.stringify(exportSpace(space), null, 2));
    console.log(Bun.YAML.stringify(exportSpace(space, true), null, 2));
  });

  it("test creating var midcomponent", () => {
    function Power({ num }: { num: Val<number> }) {
      const result = bindVar(
        makeVar(0, null, "result"),
        { num },
        ({ num }, val) => {
          val.val = num.val * num.val;
        },
      );
      return { result };
    }

    const space = deploy(null, null, () => {
      const { testVar } = vars({ testVar: 123 });
      const powerSpace = deploy(Power, { num: testVar });
      return { result: powerSpace.result.result, testVar };
    });

    expect(space.result.result.val).toEqual(123 * 123);

    console.dir(exportSpace(space), { depth: null });
    console.dir(exportSpace(space, true), { depth: null });
    console.log(Bun.YAML.stringify(exportSpace(space), null, 2));
    console.log(Bun.YAML.stringify(exportSpace(space, true), null, 2));

    space.result.testVar.val = 33;
    expect(space.result.result.val).toEqual(33 * 33);

    console.dir(exportSpace(space), { depth: null });
    console.dir(exportSpace(space, true), { depth: null });
    console.log(Bun.YAML.stringify(exportSpace(space), null, 2));
    console.log(Bun.YAML.stringify(exportSpace(space, true), null, 2));
  });
});
