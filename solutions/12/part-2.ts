import { Condition, ConditionRecord, parseInput } from "./lib";

let cache: Record<string, number> = {};

function sumArrangementBranches(
  list: ConditionRecord["list"],
  sizes: ConditionRecord["sizes"],
): number {
  return (
    countValidArrangements(`#${list}`, sizes) +
    countValidArrangements(list, sizes)
  );
}

function countDamagedSpringsAndMatchWithSizes(
  list: ConditionRecord["list"],
  sizes: ConditionRecord["sizes"],
): number {
  const [targetSize, ...remainingSizes] = sizes;
  let damagedCount = 0;

  for (let i = 0; i < list.length; i++) {
    const spring = list[i] as Condition;

    if (spring === Condition.UNKNOWN) {
      if (damagedCount === targetSize) {
        // Continue counting arrangements with a contiguous damaged section accounted for
        const remainingList = list.slice(i + 1);
        return countValidArrangements(remainingList, remainingSizes);
      }

      if (damagedCount < targetSize) {
        // Consider the UNKNOWN as DAMAGED and continue building the contiguous damaged section
        damagedCount++;
        continue;
      }

      // Damaged count is greater than the target size, meaning this branch isn't valid
      return 0;
    }

    if (spring === Condition.OPERATIONAL) {
      if (damagedCount === targetSize) {
        // We've matched a contiguous damaged section so reset and match against the next size
        const remainingList = list.slice(i + 1);
        return countValidArrangements(remainingList, remainingSizes);
      } else {
        // We've broken the contiguous damaged section, so if it doesn't match the target size this branch isn't valid
        return 0;
      }
    }

    // Spring is damaged; keep building contiguous section
    damagedCount++;
  }

  return damagedCount === targetSize && remainingSizes.length === 0 ? 1 : 0;
}

function countValidArrangements(
  list: ConditionRecord["list"],
  sizes: ConditionRecord["sizes"],
): number {
  const cacheId = `${list}:${sizes.join()}`;
  if (cache[cacheId]) {
    return cache[cacheId];
  }

  const sizesCopy = [...sizes];
  const firstSpring = list[0] as Condition;
  const listWithoutFirstSpring = list.slice(1);

  let count = 0;

  if (firstSpring === undefined && sizesCopy.length === 0) count += 1;
  if (firstSpring === undefined && sizesCopy.length > 0) count += 0;

  if (firstSpring === Condition.UNKNOWN) {
    count += sumArrangementBranches(listWithoutFirstSpring, sizesCopy);
  }

  if (firstSpring === Condition.OPERATIONAL) {
    count += countValidArrangements(listWithoutFirstSpring, sizesCopy);
  }

  if (firstSpring === Condition.DAMAGED) {
    count += countDamagedSpringsAndMatchWithSizes(list, sizesCopy);
  }

  cache[cacheId] = count;

  return count;
}

function sumArrangementsReducer(
  sum: number,
  record: ConditionRecord,
  index: number,
): number {
  console.log(index);

  cache = {};
  const counts = countValidArrangements(record.list, record.sizes);
  return sum + counts;
}

function sumArrangementCounts(records: ConditionRecord[]): number {
  return records.reduce(sumArrangementsReducer, 0);
}

export async function solve() {
  const records = await parseInput("part2");

  return sumArrangementCounts(records);
}
