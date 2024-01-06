/* eslint-disable no-constant-condition */
import { ConditionRecord, createPermutations, parseInput } from "./lib";

const arrangementCache = new Map<string, Map<string, number>>();

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
    return arrangementCache.get(group)!;
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
    .map((a) => a.join())
    .reduce((aMap, a) => {
      const count = aMap.has(a) ? aMap.get(a)! + 1 : 1;
      aMap.set(a, count);
      return aMap;
    }, new Map<string, number>());

  arrangementCache.set(group, groupArrangements);

  return groupArrangements;
}

function serializeSizes(sizes: number[], maxGroupSize: number) {
  const serialized = [];
  for (let i = 0; i < maxGroupSize; i++) {
    const s = sizes.slice(0, i + 1);
    serialized.push(s.join());
  }
  return serialized;
}

function getMaxGroupSize(groupArrangement: Map<string, number>) {
  if (!groupArrangement || groupArrangement.size === 0) {
    return 0;
  }
  const lengths = [...groupArrangement.keys()].map(
    (a) => a.replaceAll(",", "").length,
  );

  return Math.max(...lengths);
}

function getArrangementCount(
  sizes: number[],
  groupArrangements: Map<string, number>[],
  maxGroupSize: number,
): number {
  if (groupArrangements.length === 0 && sizes.length === 0) {
    return 1;
  } else if (sizes.length === 0 || groupArrangements.length === 0) {
    return 0;
  }

  const _groupArrangements = [...groupArrangements];

  const arrangement = _groupArrangements.shift()!;
  const serializedSizes = serializeSizes(sizes, maxGroupSize);
  const matchedSizes = [...arrangement.keys()].filter((a) =>
    serializedSizes.includes(a),
  );

  if (matchedSizes.length === 0) {
    return 0;
  }

  return matchedSizes.reduce((sum, size) => {
    const remainingSizes = sizes.slice(size.replaceAll(",", "").length);

    return (
      sum +
      getArrangementCount(
        remainingSizes,
        _groupArrangements,
        getMaxGroupSize(_groupArrangements[0]),
      ) *
        arrangement.get(size)!
    );
  }, 0);
}

export async function solve() {
  const records = await parseInput();

  return records.reduce((sum, record) => {
    const reducedRecord = reduceRecord(record);

    const groupArrangements = reducedRecord.groups.map(getGroupArrangements);

    return (
      sum +
      getArrangementCount(
        reducedRecord.sizes,
        groupArrangements,
        getMaxGroupSize(groupArrangements[0]),
      )
    );
  }, 0);
}
