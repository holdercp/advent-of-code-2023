import { Glob } from "bun";
import { exists, mkdir } from "fs/promises";
import { padDay } from "../lib/helpers";
import { inRange, stringIsInt } from "../lib/utils";

const [, , day] = Bun.argv;
const dayPadded = padDay(day); // Pad the day number so they appear in order in the file structure

if (!stringIsInt) {
  throw new Error(
    `The first argument should be the day number. You gave "${day}".`,
  );
}

// Copy over scaffold files to given day directory
const solutionDir = `solutions/${dayPadded}`;
const dirExists = await exists(solutionDir);

if (dirExists) {
  console.log("Directory has already exists!");
  process.exit();
}

await mkdir(solutionDir, { recursive: true });

const scaffoldDir = ".scaffold";
const scaffoldGlob = new Glob("*");
for await (const file of scaffoldGlob.scan(scaffoldDir)) {
  const input = Bun.file(`${scaffoldDir}/${file}`);
  const output = Bun.file(`${solutionDir}/${file}`);

  // Remove the ts-nocheck comment from our scaffold lib.ts
  if (file === "lib.ts" || file === "index.ts") {
    const libData = await input.text();
    const tsEnabledData = libData.replace("// @ts-nocheck", "").trimStart();
    await Bun.write(output, tsEnabledData);
    continue;
  }

  await Bun.write(output, input);
}

// Fetch the input for the day
const response = await fetch(`https://adventofcode.com/2023/day/${day}/input`, {
  headers: {
    cookie: `session=${process.env.ADVENT_SESSION}`,
  },
});

if (inRange(response.status, 200, 299)) {
  await Bun.write(`${solutionDir}/input.txt`, response);
} else {
  console.log(response);
}
