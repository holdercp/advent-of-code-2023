import { handSorter, parseInput } from "./lib";

export async function solve() {
  const hands = await parseInput();

  const sortedHands = hands.sort(handSorter);

  return sortedHands.reduce((total, { bid }, i) => total + bid * (i + 1), 0);
}
