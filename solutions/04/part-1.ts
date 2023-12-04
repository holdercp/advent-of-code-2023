import { parseInput } from "./lib";

function findDuplicates(a: number[], b: number[]) {
  const d: number[] = [];
  b.forEach((n) => {
    if (a.includes(n)) d.push(n);
  });
  return d;
}

export async function solve() {
  const cards = await parseInput();

  const worth = cards.reduce((sum, c) => {
    const matches = findDuplicates(c.winners, c.numbers).length;
    return matches ? sum + 1 * Math.pow(2, matches - 1) : sum;
  }, 0);

  return worth;
}
