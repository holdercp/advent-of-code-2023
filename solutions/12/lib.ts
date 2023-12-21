import { readInput } from "../../lib/helpers";

export type ConditionRecord = {
  list: string[];
  sizes: number[];
};

export async function parseInput() {
  const lines = (await readInput(import.meta.dir)).split("\n");
  const records: ConditionRecord[] = lines.map((line) => {
    const [list, sizes] = line.split(" ");
    return {
      list: list.split(""),
      sizes: sizes.split(",").map(Number),
    };
  });

  return records;
}
