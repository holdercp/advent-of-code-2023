import { ConditionRecord, parseInput } from "./lib";

function createPattern(n: number) {
  return [".", ...Array(n).fill("#"), "."].join("");
}

function checkMatch(groups: string[], sizes: number[]) {
  let groupsStr = groups.join("");
  return sizes.every((s) => {
    const pattern = createPattern(s);
    const matchIndex = groupsStr.indexOf(pattern);

    if (matchIndex > -1) {
      groupsStr = groupsStr.slice(matchIndex + (s + 1));
      return true;
    }

    return false;
  });
}

function createPermutations(groups: string[], wilds: number[]): string[][] {
  if (wilds.length === 0) {
    return [groups];
  }

  const wild = wilds.pop();

  if (wild) {
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

  const perms = createPermutations(groups, wilds);

  return perms.reduce((sum, p) => {
    if (checkMatch(p, sizes)) {
      return sum + 1;
    }

    return sum;
  }, 0);
}

export async function solve() {
  const records = await parseInput();

  return records.reduce((sum, record) => {
    const perms = getPermutationCount(record);
    return sum + perms;
  }, 0);
}
