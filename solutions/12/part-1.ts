import { ConditionRecord, parseInput } from "./lib";

function checkMatch(counts: number[], sizes: number[]) {
  if (counts.length !== sizes.length) return false;

  return counts.every((c, i) => c === sizes[i]);
}

function reduceSegmentsToCounts(segments: string[]) {
  return segments
    .join("")
    .split(".")
    .filter((g) => g)
    .map((springs) => springs.length);
}

function createPermutations(segments: string[], wilds: number[]): string[][] {
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

function getArrangementCount(record: ConditionRecord) {
  const { list, sizes } = record;
  const wilds: number[] = [];
  list.forEach((symbol, i) => {
    if (symbol === "?") {
      wilds.push(i);
    }
  });

  const springGroupCounts = createPermutations(list, wilds).map((segments) =>
    reduceSegmentsToCounts(segments),
  );

  return springGroupCounts.reduce((sum, counts) => {
    if (checkMatch(counts, sizes)) {
      return sum + 1;
    }

    return sum;
  }, 0);
}

export async function solve() {
  const records = await parseInput();

  return records.reduce((sum, record) => {
    const perms = getArrangementCount(record);
    return sum + perms;
  }, 0);
}
