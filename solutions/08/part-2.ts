import { Instruction, NodeMap, parseInput } from "./lib";
import * as utils from "../../lib/utils";

async function findMinimumMoves(
  id: string,
  nodes: NodeMap,
  instructions: Instruction[],
) {
  let node = nodes[id];
  let moves = 0;
  let pos = 0;
  let done = false;
  while (!done) {
    const instruction = instructions[pos];

    const next = node[instruction];
    moves += 1;

    if (next.endsWith("Z")) {
      done = true;
    }

    pos = (pos + 1) % instructions.length;
    node = nodes[next];
  }

  return moves;
}

export async function solve(example: boolean | undefined) {
  const { instructions, nodes } = await parseInput(example);

  const startingNodeIds = Object.keys(nodes).filter((id) => id.endsWith("A"));

  const trips = startingNodeIds.map((id) =>
    findMinimumMoves(id, nodes, instructions),
  );
  const minimums = await Promise.all(trips);

  return minimums.reduce((mul, min) => utils.lcm(mul, min));
}
