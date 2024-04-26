import { Spring, ConditionRecord, parseInput } from "./lib";

function trimOperationalSprings(
  springs: ConditionRecord["springs"],
): ConditionRecord["springs"] {
  const firstNonOperational = springs.findIndex(
    (s) => s === Spring.DAMAGED || s === Spring.UNKNOWN,
  );
  return springs.slice(firstNonOperational);
}

function createCacheKey(
  spring: ConditionRecord["springs"],
  damages: ConditionRecord["damages"],
): string {
  return `${spring.join()}:${damages.join()}`;
}

function countValidArrangements(
  springs: ConditionRecord["springs"],
  damages: ConditionRecord["damages"],
  cache: Map<string, number>,
): number {
  const cacheKey = createCacheKey(springs, damages);
  const cacheResult = cache.get(cacheKey);
  if (cacheResult !== undefined) return cacheResult;

  // If we're out of springs then either we've distributed all damage and we've found a
  // valid arrangement, or we have damage left and it's invalid
  if (springs.length === 0) return damages.length === 0 ? 1 : 0;

  const [firstSpring, ...remainingSprings] = springs;
  let count = 0;

  if (firstSpring === Spring.OPERATIONAL) {
    // Remove all the operational springs from the beginning and recurse to solve this branch
    count += countValidArrangements(
      trimOperationalSprings(remainingSprings),
      damages,
      cache,
    );
  } else if (firstSpring === Spring.UNKNOWN) {
    // Create two branches:
    // one where the unknown is damage
    // and one where it's operational (which we just remove)
    count +=
      countValidArrangements(
        [Spring.DAMAGED, ...remainingSprings],
        damages,
        cache,
      ) + countValidArrangements(remainingSprings, damages, cache);
  } else if (firstSpring === Spring.DAMAGED) {
    if (damages.length > 0) {
      const [damage, ...remainingDamage] = damages;
      if (
        damage <= springs.length &&
        !springs.slice(0, damage).includes(Spring.OPERATIONAL)
      ) {
        if (damage === springs.length && remainingDamage.length === 0) {
          count += 1;
        } else if (springs[damage] !== "#") {
          count += countValidArrangements(
            springs.slice(damage + 1),
            remainingDamage,
            cache,
          );
        }
      }
    }
  }

  cache.set(cacheKey, count);
  return count;
}

function sumArrangementsReducer(sum: number, record: ConditionRecord): number {
  const counts = countValidArrangements(
    record.springs,
    record.damages,
    new Map(),
  );
  return sum + counts;
}

function sumArrangementCounts(records: ConditionRecord[]): number {
  return records.reduce(sumArrangementsReducer, 0);
}

export async function solve() {
  const records = await parseInput("part2");

  return sumArrangementCounts(records);
}
