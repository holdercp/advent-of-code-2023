import { readInput } from "../../lib/helpers";

export type ConditionRecord = {
  groups: string[];
  sizes: number[];
};

export async function parseInput() {
  const lines = (await readInput(import.meta.dir, true)).split("\n");
  const records = lines.map((line) => {
    const [groups, sizes] = line.split(" ");
    return {
      groups: [".", ...groups.split(""), "."],
      sizes: sizes.split(",").map(Number),
    };
  });

  return records;
}
