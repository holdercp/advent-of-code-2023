import { parseInput, wildHandSorter } from "./lib";

export async function solve(example: boolean | undefined) {
  const hands = await parseInput(example, true);

  const sortedHands = hands.sort(wildHandSorter);

  return sortedHands.reduce((total, { bid }, i) => total + bid * (i + 1), 0);
}
