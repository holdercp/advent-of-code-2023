import { parseInput, getDifferences } from "./lib";

function calcNextValue(history: number[]) {
  const ends = [history[history.length - 1]];
  let done = false;
  let _history = history;

  while (!done) {
    const diffs = getDifferences(_history);
    if (diffs.every((d) => d === 0)) {
      done = true;
    } else {
      ends.push(diffs[diffs.length - 1]);
      _history = diffs;
    }
  }

  return ends.reduceRight((prev, current) => prev + current, 0);
}

export async function solve() {
  const histories = await parseInput();
  return histories.reduce((sum, h) => sum + calcNextValue(h), 0);
}
