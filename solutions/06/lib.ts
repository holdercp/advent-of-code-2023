import { readInput } from "../../lib/helpers";

function parseRaw(s: string, delimiter = "") {
  return s
    .split(delimiter)[1]
    .trim()
    .split(" ")
    .filter((t) => t)
    .map(Number);
}

export async function parseInput() {
  const [timeRaw, disRaw] = (await readInput(import.meta.dir)).split("\n");

  const times = parseRaw(timeRaw, "Time: ");
  const distances = parseRaw(disRaw, "Distance: ");

  // Part 2
  const time = parseInt(timeRaw.split("Time: ")[1].replaceAll(" ", ""), 10);
  const distance = parseInt(
    disRaw.split("Distance: ")[1].replaceAll(" ", ""),
    10,
  );

  return { times, distances, time, distance };
}
