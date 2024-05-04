import { Rock, parseInput } from "./lib";

// Uses a modified arithmetic series sum to calculate the load in a column
// Modification: we use the maxLoad as the last term
// and subtract the number of terms minus the common difference to get the first term
function calculateLoad(maxLoad: number, roundedRocksCount: number): number {
  const numberOfTerms = roundedRocksCount;
  const firstTerm = maxLoad - (numberOfTerms - 1);

  const sum = (numberOfTerms / 2) * (2 * firstTerm + (numberOfTerms - 1));

  return sum;
}

function countRoundedRocksUntilCubeOrEnd(
  startingPoint: number,
  column: string,
): { roundedRockCount: number; endPosition: number } {
  let position = startingPoint + 1;
  let rock = column[position];
  let roundedRockCount = 0;
  while (rock !== Rock.CUBE && position < column.length) {
    if (rock === Rock.ROUNDED) {
      roundedRockCount++;
    }

    position++;
    rock = column[position];
  }

  return { roundedRockCount, endPosition: position };
}

function isPositionACubedRock(column: string, position: number) {
  return column[position] === Rock.CUBE;
}

function sumTotalLoadReducer(sum: number, column: string) {
  const maxLoad = column.length;
  const startingPointQueue = [-1];
  let columnLoad = 0;

  while (startingPointQueue.length > 0) {
    const startingPoint = startingPointQueue.shift();
    if (startingPoint === undefined)
      throw new Error("Starting point was undefined");

    const { roundedRockCount, endPosition } = countRoundedRocksUntilCubeOrEnd(
      startingPoint,
      column,
    );

    if (isPositionACubedRock(column, endPosition)) {
      startingPointQueue.push(endPosition);
    }

    columnLoad += calculateLoad(
      maxLoad - (startingPoint + 1),
      roundedRockCount,
    );
  }

  return sum + columnLoad;
}

export async function solve(example: boolean | undefined): Promise<number> {
  const platform = await parseInput(example);

  return platform.reduce(sumTotalLoadReducer, 0);
}
