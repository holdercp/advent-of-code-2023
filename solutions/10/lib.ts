import { readInput } from "../../lib/helpers";

export type Graph = {
  [id: string]: Connection;
};

type Connection = { [id: string]: number };

function getConnections(
  pipe: string,
  pos: number,
  len: number,
  map: string,
): Connection {
  if (pipe === "|") {
    return {
      [`${pos - len}`]: 1,
      [`${pos + len}`]: 1,
    };
  }

  if (pipe === "-") {
    return {
      [`${pos - 1}`]: 1,
      [`${pos + 1}`]: 1,
    };
  }

  if (pipe === "L") {
    return {
      [`${pos - len}`]: 1,
      [`${pos + 1}`]: 1,
    };
  }

  if (pipe === "J") {
    return {
      [`${pos - len}`]: 1,
      [`${pos - 1}`]: 1,
    };
  }

  if (pipe === "7") {
    return {
      [`${pos - 1}`]: 1,
      [`${pos + len}`]: 1,
    };
  }

  if (pipe === "F") {
    return {
      [`${pos + 1}`]: 1,
      [`${pos + len}`]: 1,
    };
  }

  if (pipe === "S") {
    const n = pos - len;
    const s = pos + len;
    const e = pos + 1;
    const w = pos - 1;

    const connection: Connection = {};

    if (map[n] === "|" || map[n] === "F" || map[n] === "7") {
      connection[`${n}`] = 1;
    }

    if (map[s] === "|" || map[s] === "J" || map[s] === "L") {
      connection[`${s}`] = 1;
    }

    if (map[e] === "-" || map[e] === "7" || map[e] === "J") {
      connection[`${e}`] = 1;
    }

    if (map[w] === "-" || map[w] === "L" || map[w] === "F") {
      connection[`${w}`] = 1;
    }

    return connection;
  }

  throw new Error(`bad pipe: ${pipe}`);
}

function createGraph(s: string, len: number): Graph {
  const g: Graph = {};

  for (let i = 0; i < s.length; i++) {
    const el = s[i];

    if (el === ".") continue;

    const connections = getConnections(el, i, len, s);
    g[`${i}`] = connections;
  }

  return g;
}

export async function parseInput(): Promise<{
  graph: Graph;
  start: string;
  pipes: string;
}> {
  const input = await readInput(import.meta.dir, true);
  const rowLen = input.indexOf("\n");
  const pipes = input.replaceAll("\n", "");
  const start = `${pipes.indexOf("S")}`;

  return { graph: createGraph(pipes, rowLen), start, pipes };
}
