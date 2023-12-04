import { parseInput, findDuplicates } from "./lib";

export async function solve() {
  const cards = await parseInput();

  const worth = cards.reduce((sum, c) => {
    const matches = findDuplicates(c.winners, c.numbers).length;
    return matches ? sum + 1 * Math.pow(2, matches - 1) : sum;
  }, 0);

  return worth;
}
