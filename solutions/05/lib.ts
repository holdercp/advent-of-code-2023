import { readInput } from "../../lib/helpers";

const mapNames = [
  "seed-to-soil",
  "soil-to-fertilizer",
  "fertilizer-to-water",
  "water-to-light",
  "light-to-temperature",
  "temperature-to-humidity",
  "humidity-to-location",
] as const;

type MapName = (typeof mapNames)[number];

type Maps = {
  [k in MapName]: DestMap[];
};

export type DestMap = {
  src: {
    start: number;
    end: number;
  };
  dest: {
    start: number;
    end: number;
  };
};

export function isMapName(n: string): n is MapName {
  return mapNames.includes(n as MapName);
}

function parseMapsMapper(m: string) {
  const [titleRaw, ...data] = m.split("\n");

  const [title] = titleRaw.split(" map:");

  const parsedMap = data
    .map((d) => d.split(" ").map(Number))
    .map((r) => {
      const [destStart, srcStart, len] = r;
      return {
        src: {
          start: srcStart,
          end: srcStart + (len - 1),
        },
        dest: {
          start: destStart,
          end: destStart + (len - 1),
        },
      };
    });

  return { title, parsedMap };
}

function parseSeeds(s: string) {
  return s.split(": ")[1].split(" ").map(Number);
}

function parsedSeedPairs(s: string) {
  const parsedSeeds = parseSeeds(s);

  const parsed = [];
  for (let i = 0; i < parsedSeeds.length - 1; i += 2) {
    const start = parsedSeeds[i];
    const len = parsedSeeds[i + 1];

    parsed.push([start, start + (len - 1)]);
  }

  return parsed;
}

export async function parseInput() {
  const input = await readInput(import.meta.dir);
  const [seedsRaw, ...mapsRaw] = input.split("\n\n");

  const seeds = parseSeeds(seedsRaw);
  const seedPairs = parsedSeedPairs(seedsRaw);

  const maps = mapsRaw
    .map(parseMapsMapper)
    .reduce((acc, { title, parsedMap }) => {
      if (!isMapName(title)) throw new Error("bad title");

      acc[title] = parsedMap;
      return acc;
    }, {} as Maps);

  return { seeds, maps, seedPairs };
}
