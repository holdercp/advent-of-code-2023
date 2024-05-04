import { handSorter, parseInput } from "./lib";

export async function solve(example: boolean | undefined) {
  const hands = await parseInput(example);

  const sortedHands = hands.sort(handSorter);

  return sortedHands.reduce((total, { bid }, i) => total + bid * (i + 1), 0);
}
