import { DestMap, parseInput } from "./lib";

function mapBuilder(mapData: DestMap[]) {
  return function mapper(pair: number[]) {
    const remainingPairs = [[...pair]];
    const unmatchedPairs = [];
    const pairs = [];

    while (remainingPairs.length > 0) {
      const currentPair = remainingPairs.pop();
      if (!currentPair) throw new Error("bad pair");

      const [pStart, pEnd] = currentPair;

      let matched = false;
      for (let i = 0; i < mapData.length; i++) {
        const m = mapData[i];

        // Outside bounds
        if (pEnd < m.src.start || pStart > m.src.end) {
          continue;
        }

        // Range is contained completely in bounds
        if (pStart >= m.src.start && pEnd <= m.src.end) {
          const sOffset = pStart - m.src.start;
          const eOffset = m.src.end - pEnd;

          const dStart = m.dest.start + sOffset;
          const dEnd = m.dest.end - eOffset;

          pairs.push([dStart, dEnd]);
          matched = true;
          continue;

          // Range overlaps on lower bounds
        } else if (pStart < m.src.start && pEnd <= m.src.end) {
          const eOffset = m.src.end - pEnd;

          const dStart = m.dest.start;
          const dEnd = m.dest.end - eOffset;

          pairs.push([dStart, dEnd]);

          remainingPairs.push([pStart, m.src.start - 1]);
          matched = true;
          continue;

          // Range overlaps on upper bounds
        } else if (pStart >= m.src.start && pEnd > m.src.end) {
          const sOffset = pStart - m.src.start;

          const dStart = m.dest.start - sOffset;
          const dEnd = m.dest.end;

          pairs.push([dStart, dEnd]);

          remainingPairs.push([m.src.end + 1, pEnd]);
          matched = true;
          continue;

          // Range contains bounds
        } else if (pStart < m.src.start && pEnd > m.src.end) {
          pairs.push([m.dest.start, m.dest.end]);

          remainingPairs.push([pStart, m.src.start - 1], [m.src.end + 1, pEnd]);
          matched = true;
          continue;
        } else {
          throw new Error("shouldn't get here");
        }
      }

      if (!matched) {
        unmatchedPairs.push(currentPair);
      }
    }

    return [...pairs, ...unmatchedPairs];
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
