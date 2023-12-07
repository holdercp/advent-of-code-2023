import { parseInput, wildHandSorter } from "./lib";

export async function solve() {
  const hands = await parseInput(true);

  const sortedHands = hands.sort(wildHandSorter);

  return sortedHands.reduce((total, { bid }, i) => total + bid * (i + 1), 0);
}
