import { padDay } from "../lib/helpers";
import { stringIsInt } from "../lib/utils";
import { parseArgs } from "util";

const { values, positionals } = parseArgs({
  args: Bun.argv,
  options: {
    example: {
      type: "boolean",
      short: "e",
    },
    debug: {
      type: "boolean",
      short: "d",
    },
  },
  strict: true,
  allowPositionals: true,
});

const [, , day] = positionals;

if (!stringIsInt(day)) {
  throw new Error(
    `The first argument should be the day number. You gave "${day}".`,
  );
}

const dayPadded = padDay(day);

const cmd = ["bun"];

if (values.debug) {
  cmd.push("--inspect-brk");
}

cmd.push(`./solutions/${dayPadded}/index.ts`);

if (values.example) {
  cmd.push("--example");
}

Bun.spawnSync(cmd, {
  stdout: "inherit",
  stderr: "inherit",
});
