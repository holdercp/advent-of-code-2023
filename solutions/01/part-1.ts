import { parseInput } from "./lib";

export async function solve() {
  const calibration = await parseInput();

  const corrected = calibration.map((c) => {
    const digits = c.replaceAll(/[^0-9]/g, "");
    const first = digits[0];
    const last = digits[digits.length - 1];

    return parseInt(`${first}${last}`, 10);
  });

  return corrected.reduce((sum, d) => sum + d, 0);
}
