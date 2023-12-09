import { parseInput, getDifferences } from "./lib";

function calcPrevValue(history: number[]) {
  const starts = [history[0]];
  let done = false;
  let _history = history;

  while (!done) {
    const diffs = getDifferences(_history);
    if (diffs.every((d) => d === 0)) {
      done = true;
    } else {
      starts.push(diffs[0]);
      _history = diffs;
    }
  }

  return starts.reduceRight((prev, current) => current - prev, 0);
}

export async function solve() {
  const histories = await parseInput();
  return histories.reduce((sum, h) => sum + calcPrevValue(h), 0);
}
