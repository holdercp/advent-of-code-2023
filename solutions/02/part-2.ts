import { isColor, parseInput, Reveal } from ".";

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

export async function solve() {
  const games = await parseInput();

  const fewest = Object.values(games).map(findFewest);

  return fewest.reduce((sum, f) => {
    const power = Object.values(f).reduce((p, v) => p * v);
    return sum + power;
  }, 0);
}
