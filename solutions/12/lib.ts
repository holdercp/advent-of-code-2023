import { readInput } from "../../lib/helpers";

export type ConditionRecord = {
  springs: Spring[];
  damages: number[];
};

export enum Spring {
  OPERATIONAL = ".",
  DAMAGED = "#",
  UNKNOWN = "?",
}

function unfold(line: string): [string, string] {
  const [list, sizes] = line.split(" ");
  return [new Array(5).fill(list).join("?"), new Array(5).fill(sizes).join()];
}

export async function parseInput(part: "part1" | "part2" = "part1") {
  const lines = (await readInput(import.meta.dir)).split("\n");
  const records: ConditionRecord[] = lines.map((line) => {
    const [springs, damages] =
      part === "part2" ? unfold(line) : line.split(" ");

    return {
      springs: springs.split("") as Spring[],
      damages: damages.split(",").map(Number),
    };
  });

  return records;
}
