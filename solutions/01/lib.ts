import { readInput } from "../../lib/helpers";

export async function parseInput(example: boolean | undefined) {
  const input = await readInput(import.meta.dir, example);
  const calibration = input.split("\n");

  return calibration;
}
