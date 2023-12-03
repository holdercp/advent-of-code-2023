import { readInput } from "../../lib/helpers";

export async function parseInput() {
  const input = await readInput(import.meta.dir);
  const lineLen = input.indexOf("\n");
  const schematic = input.replaceAll("\n", "").trim();

  return { schematic, lineLen };
}
