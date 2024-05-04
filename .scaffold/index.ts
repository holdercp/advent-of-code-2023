// @ts-nocheck
import * as one from "./part-1";
import * as two from "./part-2";

import { parseArgs } from "util";

const { values } = parseArgs({
  args: Bun.argv,
  options: {
    example: {
      type: "boolean",
    },
  },
  strict: true,
  allowPositionals: true,
});

console.log(`Part 1: `, await one.solve(values.example));
console.log(`Part 2: `, await two.solve(values.example));
