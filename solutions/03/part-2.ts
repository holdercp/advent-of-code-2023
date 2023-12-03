import { stringIsInt } from "../../lib/utils";
import { parseInput } from "./lib";

function getAdj(i: number, len: number) {
  return [
    i - (len + 1),
    i - len,
    i - (len - 1),
    i - 1,
    i + 1,
    i + (len + 1),
    i + len,
    i + (len - 1),
  ];
}

export async function solve() {
  const { schematic, lineLen } = await parseInput();

  let sum = 0;
  const posNumMap: { [k: string]: { id: number; value: number } } = {};

  let activeNumId = 1;
  let activeNum = "";
  let pos = [];
  for (let i = 0; i < schematic.length; i++) {
    const c = schematic[i];

    if (stringIsInt(c) && i % lineLen !== 0) {
      activeNum += c;
      pos.push(i);
      continue;
    }

    if (activeNum) {
      const num = {
        id: activeNumId,
        value: parseInt(activeNum, 10),
      };
      pos.forEach((p) => {
        posNumMap[p] = num;
      });
      activeNum = "";
      activeNumId += 1;
      pos = [];
    }

    if (stringIsInt(c)) {
      activeNum += c;
      pos.push(i);
    }
  }

  for (let i = 0; i < schematic.length; i++) {
    const c = schematic[i];

    if (c === "*") {
      const seenIds: number[] = [];
      const adjNums: number[] = [];
      const adj = getAdj(i, lineLen);
      adj.forEach((a) => {
        if (posNumMap[a] && !seenIds.includes(posNumMap[a].id)) {
          seenIds.push(posNumMap[a].id);
          adjNums.push(posNumMap[a].value);
        }
      });

      if (adjNums.length === 2) {
        sum += adjNums.reduce((p, n) => p * n, 1);
      }
    }
  }

  return sum;
}
