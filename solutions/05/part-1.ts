import { DestMap, parseInput } from "./lib";

function mapBuilder(mapData: DestMap[]) {
  return function mapper(source: number) {
    const foundMap = mapData.find(
      (d) => d.src.start <= source && d.src.end >= source,
    );

    if (!foundMap) return source;

    const offset = source - foundMap.src.start;
    return foundMap.dest.start + offset;
  };
}

export async function solve(example: boolean | undefined) {
  const { seeds, maps } = await parseInput(example);

  const locations = seeds
    .map(mapBuilder(maps["seed-to-soil"]))
    .map(mapBuilder(maps["soil-to-fertilizer"]))
    .map(mapBuilder(maps["fertilizer-to-water"]))
    .map(mapBuilder(maps["water-to-light"]))
    .map(mapBuilder(maps["light-to-temperature"]))
    .map(mapBuilder(maps["temperature-to-humidity"]))
    .map(mapBuilder(maps["humidity-to-location"]));

  return Math.min(...locations);
}
