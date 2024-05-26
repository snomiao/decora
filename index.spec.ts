import { decora } from ".";
import { it, expect, spyOn, mock } from "bun:test";

spyOn(console, "log");
// let logs: any[] = [];
// console.log = (...args) => {
//   logs.push(args[0]);
//   console.info(...args);
// };

function peekFn<A extends any[], R>(fn: (...args: A) => R) {
  return (...args: A) => {
    const ret = fn(...args);

    Promise.resolve(ret).then((ret) =>
      console.log(`${JSON.stringify(args)} => ${ret}`)
    );
    return ret;
  };
}

class Test {
  @decora(peekFn)
  add(a: number, b: number) {
    return a + b;
  }
  @decora(peekFn)
  async addAsync(a: number, b: number) {
    return a + b;
  }
  @decora(peekFn)
  static staticAdd(a: number, b: number) {
    return a + b;
  }
  @decora(peekFn)
  static async staticAddAsync(a: number, b: number) {
    return a + b;
  }
}

it("Decora with peek function", async () => {
  expect(new Test().add(1, 2)).toBe(3);
  expect(await new Test().addAsync(2, 3)).toBe(5);
  expect(Test.staticAdd(3, 4)).toBe(7);
  expect(await Test.staticAddAsync(4, 5)).toBe(9);
  expect(console.log).toHaveBeenCalledWith("[1,2] => 3");
  expect(console.log).toHaveBeenCalledWith("[2,3] => 5");
  expect(console.log).toHaveBeenCalledWith("[3,4] => 7");
  expect(console.log).toHaveBeenCalledWith("[4,5] => 9");
});
