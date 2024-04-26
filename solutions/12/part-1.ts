import { Spring, ConditionRecord, parseInput } from "./lib";

function trimOperationalSprings(
  springs: ConditionRecord["springs"],
): ConditionRecord["springs"] {
  const firstNonOperational = springs.findIndex(
    (s) => s === Spring.DAMAGED || s === Spring.UNKNOWN,
  );
  return springs.slice(firstNonOperational);
}

function countValidArrangements(
  springs: ConditionRecord["springs"],
  damages: ConditionRecord["damages"],
): number {
  // If we're out of springs then either we've distributed all damage and we've found a
  // valid arrangement, or we have damage left and it's invalid
  if (springs.length === 0) return damages.length === 0 ? 1 : 0;

  const [firstSpring, ...remainingSprings] = springs;

  if (firstSpring === Spring.OPERATIONAL) {
    // Remove all the operational springs from the beginning and recurse to solve this branch
    return countValidArrangements(
      trimOperationalSprings(remainingSprings),
      damages,
    );
  }

  if (firstSpring === Spring.UNKNOWN) {
    // Create two branches:
    // one where the unknown is damage
    // and one where it's operational (which we just remove)
    return (
      countValidArrangements([Spring.DAMAGED, ...remainingSprings], damages) +
      countValidArrangements(remainingSprings, damages)
    );
  }

  if (firstSpring === Spring.DAMAGED) {
    // If we've distributed all the damage, yet the first spring is damage, we've overshot and it's invalid
    if (damages.length === 0) return 0;

    const [targetDamage, ...remainingDamage] = damages;
    // If there are not enough spring "slots" to hold the first damage group
    // or there would be operational springs in that group, it's invalid
    if (
      targetDamage > springs.length ||
      springs.slice(0, targetDamage).includes(Spring.OPERATIONAL)
    ) {
      return 0;
    }

    // If the damage we're trying to distribute is equal to the rest of the spring slots,
    // and there's no more damage to distribute, we have a valid arrangement,
    // otherwise we don't have enough slots to fit the remaining damage so it's invalid
    if (targetDamage === springs.length) {
      return remainingDamage.length === 0 ? 1 : 0;
    }

    // At this point, if the slot just beyond the slots we're using to distribute the current damage
    // is also damaged, we know this target damage doesn't match so it's invalid
    if (springs[targetDamage] === "#") {
      return 0;
    }

    // If we get here, it means the damage will fit and the spot just beyond the damage slots can be treated as operational.
    return countValidArrangements(
      springs.slice(targetDamage + 1),
      remainingDamage,
    );
  }

  throw new Error(`An invalid spring condition was given: ${firstSpring}`);
}

function sumArrangementsReducer(sum: number, record: ConditionRecord): number {
  const counts = countValidArrangements(record.springs, record.damages);
  return sum + counts;
}

function sumArrangementCounts(records: ConditionRecord[]): number {
  return records.reduce(sumArrangementsReducer, 0);
}

export async function solve() {
  const records = await parseInput();

  return sumArrangementCounts(records);
}
