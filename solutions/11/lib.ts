import { readInput } from "../../lib/helpers";

type Universe = string[][];

function buildUniverse(s: string): Universe {
  return s.split("\n").map((l) => l.split(""));
}

function findEmptyRows(u: Universe) {
  const rows: number[] = [];
  u.forEach((r, i) => {
    if (r.every((el) => el === ".")) {
      rows.push(i);
    }
  });

  return rows;
}

function findEmptyCols(u: Universe) {
  const cols: number[] = [];

  for (let i = 0; i < u[0].length; i++) {
    const c = u.map((r) => r[i]);
    if (c.every((el) => el === ".")) {
      cols.push(i);
    }
  }

  return cols;
}

function findGalaxies(
  u: Universe,
  emptyCols: number[],
  emptyRows: number[],
  expand: number,
) {
  const g = [];

  for (let y = 0; y < u.length; y++) {
    for (let x = 0; x < u[y].length; x++) {
      const el = u[y][x];
      if (el === "#") {
        const emptyColCount = emptyCols.filter((c) => c < x).length;
        const emptyRowCount = emptyRows.filter((r) => r < y).length;

        const xOffset = (expand - 1) * emptyColCount;
        const yOffset = (expand - 1) * emptyRowCount;

        g.push([x + xOffset, y + yOffset]);
      }
    }
  }
  return g;
}

export async function parseInput(example: boolean | undefined, part2 = false) {
  const input = await readInput(import.meta.dir, example);
  const universe = buildUniverse(input);

  const emptyCols = findEmptyCols(universe);
  const emptyRows = findEmptyRows(universe);

  const galaxies = findGalaxies(
    universe,
    emptyCols,
    emptyRows,
    part2 ? 1_000_000 : 2,
  );

  return galaxies;
}
