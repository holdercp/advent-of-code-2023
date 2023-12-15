import { parseInput, Position } from "./lib";

type Direction = "n" | "s" | "e" | "w";
type Pipe = "|" | "-" | "F" | "7" | "L" | "J";

// function cast(p: Position, dir: Direction, loop: Position[]) {
//   if (dir === "n") {
//     return loop.filter((lp) => lp.y < p.y && lp.x === p.x).length;
//   }
//   if (dir === "s") {
//     return loop.filter((lp) => lp.y > p.y && lp.x === p.x).length;
//   }
//   if (dir === "e") {
//     return loop.filter((lp) => lp.y === p.y && lp.x > p.x).length;
//   }
//   if (dir === "w") {
//     return loop.filter((lp) => lp.y === p.y && lp.x < p.x).length;
//   }

//   throw new Error("should not get here");
// }

// function determineStartPipe(loop: Position[]): Pipe {
//   const start = loop[0];
//   const first = loop[1];
//   const last = loop[loop.length - 1];

//   if (
//     (first.y < start.y && last.y > start.y) ||
//     (first.y > start.y && last.y < start.y)
//   )
//     return "|";

//   if (
//     (first.x < start.x && last.x > start.x) ||
//     (first.x > start.x && last.x < start.x)
//   ) {
//     return "-";
//   }

//   if (
//     (first.x < start.x && last.y > start.y) ||
//     (last.x < start.x && first.y > start.y)
//   ) {
//     return "7";
//   }

//   if (
//     (first.x > start.x && last.y > start.y) ||
//     (last.x > start.x && first.y > start.y)
//   ) {
//     return "F";
//   }

//   if (
//     (first.x > start.x && last.y < start.y) ||
//     (last.x > start.x && first.y < start.y)
//   ) {
//     return "L";
//   }

//   if (
//     (first.x < start.x && last.y < start.y) ||
//     (last.x < start.x && first.y < start.y)
//   ) {
//     return "J";
//   }

//   throw new Error("shouldn't get here");
// }

// Broken logic
// function determineInsideDir(loop: Position[]): Direction {
//   const start = loop[0];
//   const startPipe = determineStartPipe(loop);

//   if (startPipe === "|") {
//     const westIntersects = cast(start, "w", loop);
//     return westIntersects % 2 === 0 ? "e" : "w";
//   }
//   if (startPipe === "-") {
//     const northIntersects = cast(start, "n", loop);
//     return northIntersects % 2 === 0 ? "s" : "n";
//   }
//   if (startPipe === "7") {
//     const northIntersects = cast(start, "n", loop);
//     const eastIntersects = cast(start, "e", loop);

//     if (northIntersects % 2 !== 0) return "n";
//     if (eastIntersects % 2 !== 0) return "e";

//     if (loop[1].y === start.y) return "s";
//     return "w";
//   }
//   if (startPipe === "F") {
//     const northIntersects = cast(start, "n", loop);
//     const westIntersects = cast(start, "w", loop);

//     if (northIntersects % 2 !== 0) return "n";
//     if (westIntersects % 2 !== 0) return "w";

//     if (loop[1].y === start.y) return "s";
//     return "e";
//   }
//   if (startPipe === "J") {
//     const southIntersects = cast(start, "s", loop);
//     const eastIntersects = cast(start, "e", loop);

//     if (southIntersects % 2 !== 0) return "s";
//     if (eastIntersects % 2 !== 0) return "e";

//     if (loop[1].y === start.y) return "n";
//     return "w";
//   }
//   if (startPipe === "L") {
//     const southIntersects = cast(start, "s", loop);
//     const westIntersects = cast(start, "w", loop);

//     if (southIntersects % 2 !== 0) return "s";
//     if (westIntersects % 2 !== 0) return "w";

//     if (loop[1].y === start.y) return "n";
//     return "e";
//   }

//   throw new Error("shouldn't get here");
// }

function findNonLoopElements(
  p: Position,
  dir: Direction,
  loop: Position[],
  grid: string[][],
) {
  const nonLoopPos: Position[] = [];

  if (dir === "n") {
    for (let y = p.y - 1; y >= 0; y--) {
      if (loop.find((lp) => lp.y === y && lp.x === p.x)) break;
      nonLoopPos.push({ x: p.x, y });
    }
  } else if (dir === "s") {
    for (let y = p.y + 1; y < grid.length; y++) {
      if (loop.find((lp) => lp.y === y && lp.x === p.x)) break;
      nonLoopPos.push({ x: p.x, y });
    }
  } else if (dir === "e") {
    for (let x = p.x + 1; x < grid[0].length; x++) {
      if (loop.find((lp) => lp.y === p.y && lp.x === x)) break;
      nonLoopPos.push({ x, y: p.y });
    }
  } else if (dir === "w") {
    for (let x = p.x - 1; x >= 0; x--) {
      if (loop.find((lp) => lp.y === p.y && lp.x === x)) break;
      nonLoopPos.push({ x, y: p.y });
    }
  }

  return nonLoopPos;
}

function calcInsideCount(loop: Position[], grid: string[][], dir: Direction) {
  const inside = new Set();
  let _dir = dir;

  for (let i = 1; i < loop.length; i++) {
    const pos = loop[i];
    const pipe = grid[pos.y][pos.x] as Pipe;

    if (pipe === "|") {
      const insideEls = findNonLoopElements(pos, _dir, loop, grid);
      insideEls.forEach((iEl) => {
        inside.add(`${iEl.x}:${iEl.y}`);
      });
      continue;
    }
    if (pipe === "-") {
      const insideEls = findNonLoopElements(pos, _dir, loop, grid);
      insideEls.forEach((iEl) => {
        inside.add(`${iEl.x}:${iEl.y}`);
      });
      continue;
    }
    if (pipe === "F") {
      if (_dir === "n" || _dir === "w") {
        const insideEls = [
          ...findNonLoopElements(pos, "n", loop, grid),
          ...findNonLoopElements(pos, "w", loop, grid),
        ];
        insideEls.forEach((iEl) => {
          inside.add(`${iEl.x}:${iEl.y}`);
        });
        _dir = _dir === "n" ? "w" : "n";
      } else {
        _dir = _dir === "e" ? "s" : "e";
      }
      continue;
    }
    if (pipe === "7") {
      if (_dir === "n" || _dir === "e") {
        const insideEls = [
          ...findNonLoopElements(pos, "n", loop, grid),
          ...findNonLoopElements(pos, "e", loop, grid),
        ];
        insideEls.forEach((iEl) => {
          inside.add(`${iEl.x}:${iEl.y}`);
        });
        _dir = _dir === "n" ? "e" : "n";
      } else {
        _dir = _dir === "w" ? "s" : "w";
      }
      continue;
    }
    if (pipe === "J") {
      if (_dir === "s" || _dir === "e") {
        const insideEls = [
          ...findNonLoopElements(pos, "s", loop, grid),
          ...findNonLoopElements(pos, "e", loop, grid),
        ];
        insideEls.forEach((iEl) => {
          inside.add(`${iEl.x}:${iEl.y}`);
        });
        _dir = _dir === "s" ? "e" : "s";
      } else {
        _dir = _dir === "w" ? "n" : "w";
      }
      continue;
    }
    if (pipe === "L") {
      if (_dir === "s" || _dir === "w") {
        const insideEls = [
          ...findNonLoopElements(pos, "s", loop, grid),
          ...findNonLoopElements(pos, "w", loop, grid),
        ];
        insideEls.forEach((iEl) => {
          inside.add(`${iEl.x}:${iEl.y}`);
        });
        _dir = _dir === "s" ? "w" : "s";
      } else {
        _dir = _dir === "e" ? "n" : "e";
      }
      continue;
    }
  }

  return inside.size;
}

export async function solve() {
  const { loop, pipeGrid } = await parseInput();
  // const dir = determineInsideDir(loop);

  const insideCount = calcInsideCount(loop, pipeGrid, "w");

  const total = new Set();
  for (let y = 0; y < pipeGrid.length; y++) {
    for (let x = 0; x < pipeGrid[0].length; x++) {
      if (loop.find((lp) => lp.y === y && lp.x === x)) {
        continue;
      }
      total.add(`${x}:${y}`);
    }
  }

  return insideCount;
}
