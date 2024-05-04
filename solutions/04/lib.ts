import { readInput } from "../../lib/helpers";

function parseNum(numStr: string) {
  return numStr
    .split(" ")
    .filter((n) => n)
    .map(Number);
}

export function findDuplicates(a: number[], b: number[]) {
  const d: number[] = [];
  b.forEach((n) => {
    if (a.includes(n)) d.push(n);
  });
  return d;
}

export async function parseInput(example: boolean | undefined) {
  const input = await readInput(import.meta.dir, example);
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
