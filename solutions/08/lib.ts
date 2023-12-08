import { readInput } from "../../lib/helpers";

type Node = {
  L: string;
  R: string;
};

type Instruction = keyof Node;

function parseNodes(raw: string) {
  return raw.split("\n").reduce(
    (nodes, n) => {
      const [id, destinations] = n.split(" = ");
      const [L, R] = destinations.replaceAll(/\(|\)/g, "").split(", ");

      nodes[id] = {
        L,
        R,
      };

      return nodes;
    },
    {} as Record<string, Node>,
  );
}

export async function parseInput() {
  const [instructionsRaw, nodesRaw] = (await readInput(import.meta.dir)).split(
    "\n\n",
  );

  const instructions = instructionsRaw.split("") as Instruction[];
  const nodes = parseNodes(nodesRaw);

  return { instructions, nodes };
}
