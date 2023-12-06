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

  return { times, distances };
}
