import { readInput } from "../../lib/helpers";

export type Pattern = {
  rows: string[];
  cols: string[];
};

function patternToRowsAndColsReducer(
  rowsAndCols: Pattern,
  pattern: string,
  rowIndex: number,
): Pattern {
  pattern.split("").forEach((valleyItem, colIndex) => {
    const { rows, cols } = rowsAndCols;
    rows[rowIndex] = (rows[rowIndex] ?? "") + valleyItem;
    cols[colIndex] = (cols[colIndex] ?? "") + valleyItem;
  });

  return rowsAndCols;
}

function rawToPatternMapper(raw: string): Pattern {
  return raw.split("\n").reduce(patternToRowsAndColsReducer, {
    rows: [],
    cols: [],
  } as Pattern);
}

export async function parseInput(
  example: boolean | undefined,
): Promise<Pattern[]> {
  const input = await readInput(import.meta.dir, example);
  const patternsRaw = input.split("\n\n");
  const patterns: Pattern[] = patternsRaw.map(rawToPatternMapper);

  return patterns;
}
