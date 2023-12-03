import { readInput } from "../../lib/helpers";

const colors = ["red", "green", "blue"] as const;

type Color = (typeof colors)[number];

export type Reveal = {
  red?: number;
  green?: number;
  blue?: number;
};

export type Games = {
  [k: string]: Reveal[];
};

export function isColor(c: string): c is Color {
  return colors.includes(c as Color);
}

function parseColorPair(pair: string): [Color, number] {
  const [count, color] = pair.split(" ");
  const countInt = parseInt(count, 10);

  if (!isColor(color)) throw new Error(`color is not valid: ${color}`);
  if (isNaN(countInt)) throw new Error(`count is not valid ${count}`);

  return [color, countInt];
}

export async function parseInput() {
  const input = await readInput(import.meta.dir);
  const games = input.split("\n").reduce<Games>((g, l, i) => {
    const [, revealsRaw] = l.split(": ");
    const reveals = revealsRaw.split("; ");

    const gameReveals = reveals.map((r) => {
      const colors = r.split(", ");
      const colorCounts = colors.reduce<Reveal>((o, c) => {
        const [color, count] = parseColorPair(c);
        return { ...o, [color]: count };
      }, {});

      return colorCounts;
    });

    g[`${i + 1}`] = gameReveals;

    return g;
  }, {});

  return games;
}
