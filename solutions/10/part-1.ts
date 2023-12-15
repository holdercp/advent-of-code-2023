import { parseInput } from "./lib";

export async function solve() {
  const { loop } = await parseInput();
  return (loop.length + 1) / 2;
}
