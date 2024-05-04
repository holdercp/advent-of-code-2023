import { parseInput } from "./lib";

export async function solve(example: boolean | undefined) {
  const { times, distances } = await parseInput(example);

  const winners = [];
  for (let i = 0; i < times.length; i++) {
    const time = times[i];
    const record = distances[i];

    let winningHolds = 0;
    for (let holdTime = 0; holdTime < time; holdTime++) {
      const speed = holdTime;

      const timeRemaining = time - holdTime;
      const distanceTraveled = timeRemaining * speed;

      if (distanceTraveled > record) {
        winningHolds += 1;
      }
    }
    winners.push(winningHolds);
  }

  return winners.reduce((prod, w) => prod * w);
}
