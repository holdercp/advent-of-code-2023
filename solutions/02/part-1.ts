import { Games, Reveal, isColor, parseInput } from "./lib";

const LIMITS = {
  red: 12,
  green: 13,
  blue: 14,
};

function isPossible(gameTuple: [keyof Games, Reveal[]]) {
  return gameTuple[1].every((r) =>
    Object.entries(r).every(([color, count]) => {
      if (!isColor(color)) throw new Error(`color is not valid: ${color}`);

      return count <= LIMITS[color];
    }),
  );
}

export async function solve(example: boolean | undefined) {
  const games = await parseInput(example);

  const possibleGameIds = Object.entries(games)
    .filter(isPossible)
    .map(([id]) => parseInt(id, 10));

  return possibleGameIds.reduce((sum, id) => sum + id);
}
