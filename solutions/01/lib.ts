import { readInput } from "../../lib/helpers";

export async function parseInput() {
  const input = await readInput(import.meta.dir);
  const calibration = input.split("\n");

  return calibration;
}
