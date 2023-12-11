import { readInput } from "../../lib/helpers";

type Universe = string[][];

function expand(s: string): Universe {
  const expanded: string[][] = [];
  const lines = s.split("\n").map((l) => l.split(""));

  lines.forEach((line) => {
    if (line.every((el) => el === ".")) {
      expanded.push([...line]);
    }
    expanded.push([...line]);
  });

  let offset = 0;
  for (let i = 0; i < lines[0].length; i++) {
    const col = lines.map((l) => l[i]);
    if (col.every((el) => el === ".")) {
      expanded.forEach((l) => {
        l.splice(i + offset, 0, ".");
      });
      offset++;
    }
  }

  return expanded;
}

function findGalaxies(u: Universe) {
  const g = [];

  for (let y = 0; y < u.length; y++) {
    for (let x = 0; x < u[y].length; x++) {
      const el = u[y][x];
      if (el === "#") {
        g.push([x, y]);
      }
    }
  }
  return g;
}

export async function parseInput() {
  const input = await readInput(import.meta.dir);
  const expanded = expand(input);

  const galaxies = findGalaxies(expanded);

  return { expanded, galaxies };
}
