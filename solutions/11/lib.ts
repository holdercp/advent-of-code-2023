import { readInput } from "../../lib/helpers";

export async function parseInput() {
  const input = await readInput(import.meta.dir, true);

  return input;
}
