import { readInput } from "../../lib/helpers";

export async function parseInput() {
  const lines = (await readInput(import.meta.dir)).split("\n");
  const records = lines.map((line) => {
    const [groups, sizes] = line.split(" ");
    return {
      groups: groups.split(""),
      sizes: sizes.split(",").map(Number),
    };
  });

  return records;
}
