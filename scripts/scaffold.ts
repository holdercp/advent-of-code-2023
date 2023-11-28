import { Glob } from "bun";
import { mkdir } from "fs/promises";

const [, , day, ...titleWords] = process.argv;
const dayPadded = day.padStart(2, "0");
const title = titleWords.join(" ");

if (isNaN(parseInt(day, 10))) {
  throw new Error(
    `The first argument should be the day number. You gave "${day}".`,
  );
}

// Copy over scaffold files to given day directory
const solutionDir = `solutions/${dayPadded}`;
await mkdir(solutionDir, { recursive: true });

const scaffoldDir = ".scaffold";
const scaffoldGlob = new Glob("*");
for await (const file of scaffoldGlob.scan(scaffoldDir)) {
  const input = Bun.file(`${scaffoldDir}/${file}`);
  const output = Bun.file(`${solutionDir}/${file}`);

  if (title && file === "recap.md") {
    const recapData = await input.text();
    const titledData = recapData.replace("Title", title);
    await Bun.write(output, titledData);
    continue;
  }

  await Bun.write(output, input);
}

// Fetch the input for the day
const response = await fetch(`https://adventofcode.com/2022/day/${day}/input`, {
  headers: {
    cookie: `session=${process.env.ADVENT_SESSION}`,
  },
});
await Bun.write(`${solutionDir}/input.txt`, response);
