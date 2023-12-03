import { padDay } from "../lib/helpers";
import { stringIsInt } from "../lib/utils";

const [, , day, debug] = Bun.argv;

if (!stringIsInt(day)) {
  throw new Error(
    `The first argument should be the day number. You gave "${day}".`,
  );
}

const dayPadded = padDay(day);

const cmd = ["bun"];
if (debug === "-d" || debug === "--debug") {
  cmd.push("--inspect-brk");
}
cmd.push(`./solutions/${dayPadded}/index.ts`);

Bun.spawnSync(cmd, {
  stdout: "inherit",
  stderr: "inherit",
});
