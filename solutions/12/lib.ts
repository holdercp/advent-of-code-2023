import { readInput } from "../../lib/helpers";

export type ConditionRecord = {
  list: string[];
  sizes: number[];
};

export function createPermutations(
  segments: string[],
  wilds: number[],
): string[][] {
  if (wilds.length === 0) {
    return [segments];
  }

  const wild = wilds.pop();

  if (wild !== undefined) {
    const copy1 = [...segments];
    const copy2 = [...segments];

    copy1[wild] = "#";
    copy2[wild] = ".";

    return [
      ...createPermutations(copy1, [...wilds]),
      ...createPermutations(copy2, [...wilds]),
    ];
  }

  throw new Error("shouldn't get here");
}

function unfold(line: string): [string, string] {
  const [list, sizes] = line.split(" ");
  return [new Array(5).fill(list).join("?"), new Array(5).fill(sizes).join()];
}

export async function parseInput(part2 = false) {
  const lines = (await readInput(import.meta.dir, true)).split("\n");
  const records: ConditionRecord[] = lines.map((line) => {
    const [list, sizes] = part2 ? unfold(line) : line.split(" ");

    return {
      list: list.split(""),
      sizes: sizes.split(",").map(Number),
    };
  });

  return records;
}
