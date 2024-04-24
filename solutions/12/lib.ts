import { readInput } from "../../lib/helpers";

export type ConditionRecord = {
  list: string;
  sizes: number[];
};

export enum Condition {
  OPERATIONAL = ".",
  DAMAGED = "#",
  UNKNOWN = "?",
}

function unfold(line: string): [string, string] {
  const [list, sizes] = line.split(" ");
  return [new Array(5).fill(list).join("?"), new Array(5).fill(sizes).join()];
}

export async function parseInput(part: "part1" | "part2" = "part1") {
  const lines = (await readInput(import.meta.dir, "example")).split("\n");
  const records: ConditionRecord[] = lines.map((line) => {
    const [list, sizes] = part === "part2" ? unfold(line) : line.split(" ");

    return {
      list,
      sizes: sizes.split(",").map(Number),
    };
  });

  return records;
}
