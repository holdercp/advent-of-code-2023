import { parseInput, findDuplicates } from "./lib";

export async function solve(example: boolean | undefined) {
  const cards = await parseInput(example);
  const copies = Array(cards.length).fill(1);

  cards.forEach((c, i) => {
    const matches = findDuplicates(c.winners, c.numbers).length;

    for (let j = 0; j < matches; j++) {
      copies[i + j + 1] += 1 * copies[i];
    }
  });

  return copies.reduce((sum, c) => sum + c);
}
