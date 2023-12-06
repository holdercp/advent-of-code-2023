import { DestMap, parseInput } from "./lib";

function mapBuilder(mapData: DestMap[]) {
  const sortedMaps = mapData.toSorted((a, b) => {
    if (a.src.start < b.src.start) return -1;
    if (a.src.start > b.src.start) return 1;
    return 0;
  });

  return function mapper(pair: number[]) {
    let [pStart, pEnd] = pair;
    const pairs = [];
    let unmatched: number[] = [];

    for (let i = 0; i < sortedMaps.length; i++) {
      const m = sortedMaps[i];

      // Outside lower bounds
      if (pEnd < m.src.start) {
        unmatched = [pStart, pEnd];
        break;
      }

      // Range is completely contained in bounds
      if (pStart >= m.src.start && pEnd <= m.src.end) {
        const sOffset = pStart - m.src.start;
        const eOffset = m.src.end - pEnd;

        const dStart = m.dest.start + sOffset;
        const dEnd = m.dest.end - eOffset;

        pairs.push([dStart, dEnd]);
        break;
      }

      // Outside upper bounds
      if (pStart > m.src.end) {
        if (i === sortedMaps.length - 1) {
          unmatched = [pStart, pEnd];
        }
        continue;
      }

      // Overlaps upper bounds
      if (pStart >= m.src.start && pEnd > m.src.end) {
        const sOffset = pStart - m.src.start;

        const dStart = m.dest.start - sOffset;
        const dEnd = m.dest.end;

        pairs.push([dStart, dEnd]);

        pStart = m.src.end + 1;
        continue;
      }

      // Overlaps lower bounds
      if (pStart < m.src.start && pEnd <= m.src.end) {
        const eOffset = m.src.end - pEnd;

        const dStart = m.dest.start;
        const dEnd = m.dest.end - eOffset;

        pairs.push([dStart, dEnd]);

        pEnd = m.src.start - 1;
        continue;
      }

      if (pStart < m.src.start && pEnd > m.src.end) {
        pairs.push([m.dest.start, m.dest.end]);

        pStart = m.src.end + 1;
        continue;
      }
    }

    if (unmatched.length > 0) {
      pairs.push(unmatched);
    }

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

  console.log(locations);

  return Math.min(...locations.map(([ls]) => ls));
}
