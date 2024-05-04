import { parseInput } from "./lib";

export async function solve(example: boolean | undefined) {
  const { loop } = await parseInput(example);
  return loop.length / 2;
}
