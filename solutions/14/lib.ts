import { readInput } from "../../lib/helpers";

export enum Rock {
  EMPTY = ".",
  ROUNDED = "O",
  CUBE = "#",
}

export async function parseInput(example: boolean | undefined) {
  const input = await readInput(import.meta.dir, example);

  const platform: Rock[] = [];
  input.split("\n").forEach((line) => {
    line.split("").forEach((item, col) => {
      platform[col] = ((platform[col] ?? "") + item) as Rock;
    });
  });

  return platform;
}
