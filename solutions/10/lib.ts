import { readInput } from "../../lib/helpers";

export type Position = {
  x: number;
  y: number;
};

export type Pipe = "|" | "-" | "F" | "7" | "L" | "J";
export type Item = Pipe | "." | "#";

function getConnections(g: string[][], pos: Position): Position[] {
  const { x, y } = pos;
  const pipe = g[y][x];

  if (pipe === "|") {
    return [
      { x, y: y - 1 },
      { x, y: y + 1 },
    ];
  }

  if (pipe === "-") {
    return [
      { x: x - 1, y },
      { x: x + 1, y },
    ];
  }

  if (pipe === "L") {
    return [
      { x, y: y - 1 },
      { x: x + 1, y },
    ];
  }

  if (pipe === "J") {
    return [
      { x, y: y - 1 },
      { x: x - 1, y },
    ];
  }

  if (pipe === "7") {
    return [
      { x: x - 1, y },
      { x, y: y + 1 },
    ];
  }

  if (pipe === "F") {
    return [
      { x: x + 1, y },
      { x, y: y + 1 },
    ];
  }

  if (pipe === "S") {
    const n = (g[y - 1] && g[y - 1][x]) !== undefined ? g[y - 1][x] : "";
    const s = (g[y + 1] && g[y + 1][x]) !== undefined ? g[y + 1][x] : "";
    const e = (g[y] && g[y][x + 1]) !== undefined ? g[y][x + 1] : "";
    const w = (g[y] && g[y][x - 1]) !== undefined ? g[y][x - 1] : "";

    const connections = [];

    if (n === "|" || n === "F" || n === "7") {
      connections.push({
        x,
        y: y - 1,
      });
    }

    if (s === "|" || s === "J" || s === "L") {
      connections.push({
        x,
        y: y + 1,
      });
    }

    if (e === "-" || e === "7" || e === "J") {
      connections.push({
        x: x + 1,
        y,
      });
    }

    if (w === "-" || w === "L" || w === "F") {
      connections.push({
        x: x - 1,
        y,
      });
    }

    return connections;
  }

  throw new Error(`bad pipe: ${pipe}`);
}

function buildPipeGrid(s: string) {
  return s.split("\n").map((r) => r.split("")) as Item[][];
}

function findStart(g: string[][]): Position | null {
  for (let y = 0; y < g.length; y++) {
    const r = g[y];
    const x = r.findIndex((c) => c === "S");
    if (x > -1) {
      return {
        x,
        y,
      };
    }
  }
  return null;
}

function getPipeLoop(g: string[][]) {
  const startPos = findStart(g);
  if (!startPos) {
    throw new Error("Start position not found");
  }

  const loop = [startPos];
  while (loop) {
    const pos = loop[loop.length - 1];
    const prevPos = loop[loop.length - 2];
    const [c1, c2] = getConnections(g, pos);

    // Just pick the first connection when starting
    if (loop.length === 1) {
      loop.push(c1);
    } else if (
      // Check if we've completed the loop
      loop.length > 2 &&
      (c1.x === startPos.x || c2.x === startPos.x) &&
      (c1.y === startPos.y || c2.y === startPos.y)
    ) {
      break;
    } else if (c1.x === prevPos.x && c1.y === prevPos.y) {
      // Check if the first connection is already in the loop and push other
      loop.push(c2);
    } else {
      loop.push(c1);
    }
  }

  return loop;
}

export async function parseInput() {
  const input = await readInput(import.meta.dir);
  const pipeGrid = buildPipeGrid(input);
  const loop = getPipeLoop(pipeGrid);

  return { loop, pipeGrid };
}
