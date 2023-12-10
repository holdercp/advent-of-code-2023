import { Graph, parseInput } from "./lib";

function getPipeLoop(graph: Graph, start: string): string[] {
  const loopPipes = [];
  let current = start;
  let prev: string | null = null;
  let done = false;
  while (!done) {
    const connections = graph[current];
    const next = !prev
      ? Object.keys(connections)[0]
      : Object.keys(connections).find((c) => c !== prev);

    if (!next) throw new Error("bad connection");

    prev = current;
    loopPipes.push(current);

    if (next === start) {
      done = true;
      break;
    }

    current = next;
  }

  return loopPipes;
}

function createOutsideFilter(loop: string[], all: string) {
  return (pos: string) => {
    let intersections = 0;
    let next = Number(pos) - 1;
    while (all[next]) {
      if (loop.includes(`${next}`) && all[next] !== "-") {
        intersections++;
      }

      next--;
    }
    return intersections !== 0 && intersections % 2 !== 0;
  };
}

function findOutside(loop: string[], nonLoop: string[], all: string) {
  const outsideFilter = createOutsideFilter(loop, all);
  return nonLoop.filter(outsideFilter);
}

export async function solve() {
  const { graph, start, pipes } = await parseInput();
  const loop = getPipeLoop(graph, start);
  const nonLoop = pipes
    .split("")
    .map((_p, i) => `${i}`)
    .filter((_, i) => !loop.includes(`${i}`));

  console.log(loop, nonLoop);

  const outside = findOutside(loop, nonLoop, pipes);

  return outside.length;
}
