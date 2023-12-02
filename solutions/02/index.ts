import * as one from "./part-1";
import * as two from "./part-2";

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

export async function parseInput(example = false) {
  const file = `${import.meta.dir}/input${example ? "-example" : ""}.txt`;
  const input = await Bun.file(file).text();
  const games = input
    .trim()
    .split("\n")
    .reduce<Games>((g, l, i) => {
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

console.log(`Part 1: `, await one.solve());
console.log(`Part 2: `, await two.solve());
