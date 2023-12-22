/* eslint-disable no-constant-condition */
import { ConditionRecord, createPermutations, parseInput } from "./lib";

const arrangementCache = new Map<string, string[]>();

function reduceRecord(record: ConditionRecord) {
  const listGroups = record.list
    .join("")
    .split(".")
    .filter((g) => g);

  const reducedList = [...listGroups];
  const reducedSizes = [...record.sizes];

  // Remove matches from list and sizes
  // Start from end
  while (true) {
    const size = reducedSizes[reducedSizes.length - 1];
    const group = reducedList[reducedList.length - 1];

    if (
      size === group.length &&
      group.split("").every((spring) => spring === "#")
    ) {
      reducedList.pop();
      reducedSizes.pop();
    } else {
      break;
    }
  }

  // Remove matches from list and sizes
  // Start from beginning
  while (true) {
    const size = reducedSizes[0];
    const group = reducedList[0];

    if (
      size === group.length &&
      group.split("").every((spring) => spring === "#")
    ) {
      reducedList.shift();
      reducedSizes.shift();
    } else {
      break;
    }
  }

  return {
    groups: reducedList,
    sizes: reducedSizes,
  };
}

function getGroupArrangements(group: string) {
  if (arrangementCache.has(group)) {
    return arrangementCache.get(group);
  }

  const wilds: number[] = [];
  const groupArr = group.split("");
  groupArr.forEach((symbol, i) => {
    if (symbol === "?") {
      wilds.push(i);
    }
  });

  const groupArrangements = createPermutations(groupArr, wilds)
    .map((perm) =>
      perm
        .join("")
        .split(".")
        .filter((g) => g)
        .map((g) => g.length),
    )
    .filter((p) => p.length > 0)
    .map((a) => a.join(","));

  arrangementCache.set(group, groupArrangements);

  return groupArrangements;
}

export async function solve() {
  const records = await parseInput();

  records.forEach((record) => {
    const reducedRecord = reduceRecord(record);

    const groupArrangements = reducedRecord.groups.map(getGroupArrangements);

    // TODO: Recursively check each group arrangement and compare it to the sizes. Make sure to account for lengths greater than 1.
    console.log(groupArrangements);
  });

  return records;
}
