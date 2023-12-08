import { parseInput } from "./lib";

export async function solve() {
  const { instructions, nodes } = await parseInput();

  let node = nodes["AAA"];
  let moves = 0;
  let pos = 0;
  let terminal = false;
  while (!terminal) {
    const instruction = instructions[pos];

    const next = node[instruction];
    moves += 1;

    if (next === "ZZZ") {
      terminal = true;
    }

    pos = (pos + 1) % instructions.length;
    node = nodes[next];
  }

  return moves;
}
