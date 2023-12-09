import { readInput } from "../../lib/helpers";

export async function parseInput() {
  const histories = (await readInput(import.meta.dir))
    .split("\n")
    .map((h) => h.split(" ").map(Number));

  return histories;
}
