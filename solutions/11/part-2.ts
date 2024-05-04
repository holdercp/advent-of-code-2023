import { parseInput } from "./lib";

export async function solve(example: boolean | undefined) {
  const galaxies = await parseInput(example, true);

  let total = 0;
  let galaxy;
  while ((galaxy = galaxies.pop())) {
    const [x1, y1] = galaxy;
    total = galaxies.reduce((sum, other) => {
      const [x2, y2] = other;
      const distance = Math.abs(x2 - x1) + Math.abs(y2 - y1);
      return sum + distance;
    }, total);
  }

  return total;
}
