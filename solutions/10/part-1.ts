import { Graph, parseInput } from "./lib";

function followPipe(graph: Graph, start: string): number {
  let current = start;
  let prev: string | null = null;
  let moves = 0;
  let done = false;
  while (!done) {
    const connections = graph[current];
    const next = !prev
      ? Object.keys(connections)[0]
      : Object.keys(connections).find((c) => c !== prev);

    if (!next) throw new Error("bad connection");

    prev = current;
    moves += connections[next];

    if (next === start) {
      done = true;
      break;
    }

    current = next;
  }

  return moves;
}

export async function solve() {
  const { graph, start } = await parseInput();
  const travelMoves = followPipe(graph, start);
  return travelMoves / 2;
}
