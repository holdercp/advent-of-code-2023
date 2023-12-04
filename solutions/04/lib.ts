import { readInput } from "../../lib/helpers";

function parseNum(numStr: string) {
  return numStr
    .split(" ")
    .filter((n) => n)
    .map(Number);
}

export async function parseInput() {
  const input = await readInput(import.meta.dir);
  const cards = input
    .split("\n")
    .map((c) => c.split(": ")[1])
    .map((n) => n.split(" | "))
    .map(([wNums, nums]) => ({
      winners: parseNum(wNums),
      numbers: parseNum(nums),
    }));

  return cards;
}
