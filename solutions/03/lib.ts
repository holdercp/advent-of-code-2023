import { readInput } from "../../lib/helpers";

export async function parseInput(example: boolean | undefined) {
  const input = await readInput(import.meta.dir, example);
  const lineLen = input.indexOf("\n");
  const schematic = input.replaceAll("\n", "").trim();

  return { schematic, lineLen };
}
