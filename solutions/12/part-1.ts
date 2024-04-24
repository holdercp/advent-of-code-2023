import { Condition, ConditionRecord, parseInput } from "./lib";

function sumArrangementBranches(
  list: ConditionRecord["list"],
  sizes: ConditionRecord["sizes"],
): number {
  return (
    countValidArrangements(`#${list}`, [...sizes]) +
    countValidArrangements(list, [...sizes])
  );
}

function countDamagedSpringsWithSizes(
  list: ConditionRecord["list"],
  sizes: ConditionRecord["sizes"],
): number {
  let targetSize = sizes.shift();
  let damagedCount = 1;

  for (let i = 0; i < list.length; i++) {
    if (targetSize === undefined || damagedCount > targetSize) return 0;

    if (list.length === 0) {
      if (damagedCount === targetSize && sizes.length === 0) {
        return 1;
      } else {
        return 0;
      }
    }
    const spring = list[i] as Condition;

    if (spring === Condition.UNKNOWN) {
      if (damagedCount < targetSize) {
        damagedCount++;
        continue;
      } else if (damagedCount === targetSize) {
        return countValidArrangements(list.slice(i + 1), [...sizes]);
      }
    }

    if (spring === Condition.OPERATIONAL) {
      if (damagedCount === targetSize) {
        targetSize = sizes.shift();
        damagedCount = 0;
        continue;
      } else {
        return 0;
      }
    }

    damagedCount++;
  }

  return 0;
}

function countValidArrangements(
  list: ConditionRecord["list"],
  sizes: ConditionRecord["sizes"],
): number {
  const _sizes = [...sizes];
  const firstSpring = list[0] as Condition;
  const listWithoutFirstSpring = list.slice(1);

  if (firstSpring === Condition.UNKNOWN) {
    return sumArrangementBranches(listWithoutFirstSpring, _sizes);
  }

  if (firstSpring === Condition.OPERATIONAL) {
    return countValidArrangements(listWithoutFirstSpring, _sizes);
  }

  if (firstSpring === Condition.DAMAGED) {
    return countDamagedSpringsWithSizes(listWithoutFirstSpring, _sizes);
  }

  throw new Error(
    `The plucked spring was ${firstSpring}, which is not a valid Condition.`,
  );
}

function sumArrangementsReducer(sum: number, record: ConditionRecord): number {
  const counts = countValidArrangements(record.list, record.sizes);
  return sum + counts;
}

function sumArrangementCounts(records: ConditionRecord[]): number {
  return records.reduce(sumArrangementsReducer, 0);
}

export async function solve() {
  const records = await parseInput();

  return sumArrangementCounts(records);
}
