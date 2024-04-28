import { Pattern, parseInput } from "./lib";

type Reflection = {
  index: number;
  type: "horizontal" | "vertical";
};

type RelfectionIndexes = Record<string, number>;

function addReflectionIndexes(
  line: string,
  indexes: RelfectionIndexes,
): RelfectionIndexes {
  const start = 0;
  const end = line.length - 1;

  let isComplete = false;
  let walkDown = end - 1;
  let walkUp = 1;

  while (!isComplete) {
    if (walkDown === 1 || walkUp === end - 1) {
      isComplete = true;
    }

    const walkUpMid = line.length - Math.ceil((end - walkUp) / 2);
    const walkDownMid = Math.ceil((walkDown - start) / 2);
    const walkUpSlices = [
      line.slice(walkUp, walkUpMid),
      line.slice(walkUpMid, line.length).split("").reverse().join(""),
    ];
    const walkDownSlices = [
      line.slice(start, walkDownMid),
      line
        .slice(walkDownMid, walkDown + 1)
        .split("")
        .reverse()
        .join(""),
    ];

    if (walkUpSlices[0] === walkUpSlices[1]) {
      indexes[walkUpMid - 1] = (indexes[walkUpMid - 1] ?? 0) + 1;
    }

    if (walkDownSlices[0] === walkDownSlices[1]) {
      indexes[walkDownMid] = (indexes[walkDownMid] ?? 0) + 1;
    }

    walkDown -= 2;
    walkUp += 2;
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
    ([, count]) => count === pattern.length,
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
  let reflectionIndex = getReflectionIndex(rows);
  if (reflectionIndex !== undefined) {
    reflection = { index: reflectionIndex, type: "vertical" };
  } else {
    reflectionIndex = getReflectionIndex(cols);
    reflection = reflectionIndex
      ? { index: reflectionIndex, type: "horizontal" }
      : undefined;
  }

  if (!reflection) throw new Error("No reflection found!");

  const reflectionTotal = calcReflectionTotal(reflection);

  return sum + reflectionTotal;
}

export async function solve(): Promise<number> {
  const patterns = await parseInput();

  return patterns.reduce(sumPatternsReducer, 0);
}
