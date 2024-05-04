import { isColor, parseInput, Reveal } from "./lib";

function findFewest(game: Reveal[]) {
  const maxes = {
    red: 1,
    green: 1,
    blue: 1,
  };

  game.forEach((g) => {
    Object.entries(g).forEach(([color, count]) => {
      if (!isColor(color)) throw new Error(`color is not vlaid: ${color}`);

      if (count > maxes[color]) {
        maxes[color] = count;
      }
    });
  });

  return maxes;
}

export async function solve(example: boolean | undefined) {
  const games = await parseInput(example);

  const fewest = Object.values(games).map(findFewest);

  return fewest.reduce((sum, f) => {
    const power = Object.values(f).reduce((p, v) => p * v);
    return sum + power;
  }, 0);
}
