import { Pattern, parseInput } from "./lib";

type Reflection = {
  index: number;
  type: "horizontal" | "vertical";
};

type RelfectionIndexes = Record<string, number>;

function isReflected(line: string) {
  let j = line.length - 1;
  for (let i = 0; i < Math.floor(line.length / 2); i++) {
    const start = line[i];
    const end = line[j];

    if (start !== end) {
      return false;
    }

    j--;
  }

  return true;
}

function calcMidpointForUpwardsSlice(end: number, upIndex: number) {
  return end - Math.ceil((end - upIndex) / 2);
}

function calcMidpointForDownwardsSlice(start: number, downIndex: number) {
  return Math.floor((downIndex - start) / 2);
}

function addReflectionIndexes(
  line: string,
  indexes: RelfectionIndexes,
): RelfectionIndexes {
  const start = 0;
  const end = line.length - 1;

  let downIndex = end - 1;
  let upIndex = 1;

  while (downIndex > start && upIndex < end) {
    const upSlice = line.slice(upIndex, end + 1);
    const downSlice = line.slice(start, downIndex + 1);

    const slicesAndMidpointFuncs: [string, () => number][] = [
      [upSlice, () => calcMidpointForUpwardsSlice(end, upIndex)],
      [downSlice, () => calcMidpointForDownwardsSlice(start, downIndex)],
    ];

    slicesAndMidpointFuncs.forEach(([slice, calcMidpoint]) => {
      if (isReflected(slice)) {
        const mid = calcMidpoint();
        indexes[mid] = (indexes[mid] ?? 0) + 1;
      }
    });

    downIndex -= 2;
    upIndex += 2;
  }

  return indexes;
}

function getReflectionIndex(
  pattern: Pattern["rows"] | Pattern["cols"],
): number | undefined {
  const indexes: RelfectionIndexes = {};

  const allIndexes = pattern.reduce((indexes, line) => {
    return addReflectionIndexes(line, indexes);
  }, indexes);

  const commonIndex = Object.entries(allIndexes).find(
    ([, count]) => count === pattern.length - 1,
  );

  return !commonIndex ? undefined : Number(commonIndex[0]);
}

function calcReflectionTotal(reflection: Reflection): number {
  return reflection.type === "horizontal"
    ? (reflection.index + 1) * 100
    : reflection.index + 1;
}

function sumPatternsReducer(sum: number, { rows, cols }: Pattern): number {
  let reflection: Reflection | undefined;
  const verticalReflectionIndex = getReflectionIndex(rows);
  if (verticalReflectionIndex !== undefined) {
    reflection = { index: verticalReflectionIndex, type: "vertical" };
  } else {
    const horizontalReflectionIndex = getReflectionIndex(cols);
    reflection =
      horizontalReflectionIndex !== undefined
        ? { index: horizontalReflectionIndex, type: "horizontal" }
        : undefined;
  }

  if (!reflection) throw new Error("No reflection found!");

  const reflectionTotal = calcReflectionTotal(reflection);

  return sum + reflectionTotal;
}

export async function solve(example: boolean | undefined): Promise<number> {
  const patterns = await parseInput(example);

  return patterns.reduce(sumPatternsReducer, 0);
}
