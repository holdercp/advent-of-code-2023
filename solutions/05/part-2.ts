import { DestMap, parseInput } from "./lib";

function mapBuilder(mapData: DestMap[]) {
  return function mapper(pair: number[]) {
    const [pStart, pEnd] = pair;

    // const sortedMaps = mapData.toSorted((a, b) => {
    //   if (a.src.start < b.src.start) return -1;
    //   if (a.src.start > b.src.start) return 1;
    //   return 0;
    // });

    const pairs = [];
    mapData.forEach((m) => {
      // Outside lower bound
      if (pStart < m.src.start && pEnd < m.src.start) {
        pairs.push[p];
      } else if (m.src.start > pStart) {
      } else {
      }
    });

    return pairs;
  };
}

export async function solve() {
  const { seedPairs, maps } = await parseInput();

  const locations = seedPairs
    .flatMap(mapBuilder(maps["seed-to-soil"]))
    .flatMap(mapBuilder(maps["soil-to-fertilizer"]))
    .flatMap(mapBuilder(maps["fertilizer-to-water"]))
    .flatMap(mapBuilder(maps["water-to-light"]))
    .flatMap(mapBuilder(maps["light-to-temperature"]))
    .flatMap(mapBuilder(maps["temperature-to-humidity"]))
    .flatMap(mapBuilder(maps["humidity-to-location"]));

  return Math.min(...locations.map(([ls]) => ls));
}
