import { readInput } from "../../lib/helpers";

export function getDifferences(history: number[]) {
  const diffs = [];
  for (let i = 0; i < history.length - 1; i++) {
    const current = history[i];
    const next = history[i + 1];
    diffs.push(next - current);
  }
  return diffs;
}

export async function parseInput(example: boolean | undefined) {
  const histories = (await readInput(import.meta.dir, example))
    .split("\n")
    .map((h) => h.split(" ").map(Number));

  return histories;
}
