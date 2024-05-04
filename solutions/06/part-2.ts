import { parseInput } from "./lib";

export async function solve(example: boolean | undefined) {
  const { distance, time } = await parseInput(example);

  let max = 0;
  let min = 0;
  for (let testMin = 0; testMin < time; testMin++) {
    const testMax = time - testMin;

    const minSpeed = testMin;
    const maxSpeed = testMax;

    const minTimeRemaining = time - testMin;
    const maxTimeRemaining = time - testMax;

    const minDistance = minTimeRemaining * minSpeed;
    const maxDistance = maxTimeRemaining * maxSpeed;

    if (minDistance > distance) min = testMin;
    if (maxDistance > distance) max = testMax;

    if (max && min) break;
  }

  return max - min + 1;
}
