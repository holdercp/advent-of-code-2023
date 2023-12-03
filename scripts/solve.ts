import { padDay } from "../lib/helpers";

const [, , day, debug] = Bun.argv;
const dayPadded = padDay(day);

const cmd = ["bun"];
if (debug === "-d" || debug === "--debug") {
  cmd.push("--inspect-brk");
}
cmd.push(`./solutions/${dayPadded}/index.ts`);

Bun.spawnSync(cmd, {
  stdout: "inherit",
});
