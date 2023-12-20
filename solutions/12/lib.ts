import { readInput } from "../../lib/helpers";

export type ConditionRecord = {
  list: string;
  sizes: number[];
};

export async function parseInput() {
  const lines = (await readInput(import.meta.dir, true)).split("\n");
  const records: ConditionRecord[] = lines.map((line) => {
    const [groups, sizes] = line.split(" ");
    return {
      list: groups,
      sizes: sizes.split(",").map(Number),
    };
  });

  return records;
}
