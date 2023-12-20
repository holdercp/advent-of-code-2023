import { ConditionRecord, parseInput } from "./lib";

function checkMatch(counts: number[], sizes: number[]) {
  if (counts.length !== sizes.length) return false;

  return counts.every((c, i) => c === sizes[i]);
}

function reduceGroupsToCounts(groups: string[]) {
  return groups
    .join("")
    .split(".")
    .filter((g) => g)
    .map((springs) => springs.length);
}

function createPermutations(groups: string[], wilds: number[]): string[][] {
  if (wilds.length === 0) {
    return [groups];
  }

  const wild = wilds.pop();

  if (wild !== undefined) {
    const copy1 = [...groups];
    const copy2 = [...groups];

    copy1[wild] = "#";
    copy2[wild] = ".";

    return [
      ...createPermutations(copy1, [...wilds]),
      ...createPermutations(copy2, [...wilds]),
    ];
  }

  throw new Error("shouldn't get here");
}

function getPermutationCount(record: ConditionRecord) {
  const { groups, sizes } = record;
  const wilds: number[] = [];
  groups.forEach((symbol, i) => {
    if (symbol === "?") {
      wilds.push(i);
    }
  });

  const springGroupCounts = createPermutations(groups, wilds).map((groups) =>
    reduceGroupsToCounts(groups),
  );

  return springGroupCounts.reduce((sum, counts) => {
    if (checkMatch(counts, sizes)) {
      return sum + 1;
    }

    return sum;
  }, 0);
}

function groupWithoutOperational(record: ConditionRecord) {
  const listWithoutOp = record.list.split(".").filter((g) => g);
  return {
    list: listWithoutOp,
    sizes: [...record.sizes],
  };
}

export async function solve() {
  const records = await parseInput();

  const withoutOperational = records.map(groupWithoutOperational);

  return records.reduce((sum, record) => {
    const perms = getPermutationCount(record);
    return sum + perms;
  }, 0);
}
