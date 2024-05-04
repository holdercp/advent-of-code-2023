import { parseInput } from "./lib";

export async function solve(example: boolean | undefined) {
  const { instructions, nodes } = await parseInput(example);

  let node = nodes["AAA"];
  let moves = 0;
  let pos = 0;
  let done = false;
  while (!done) {
    const instruction = instructions[pos];

    const next = node[instruction];
    moves += 1;

    if (next === "ZZZ") {
      done = true;
    }

    pos = (pos + 1) % instructions.length;
    node = nodes[next];
  }

  return moves;
}
