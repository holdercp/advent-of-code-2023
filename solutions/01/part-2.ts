import { parseInput } from "./lib";
import * as utils from "../../lib/utils";

const digits = ["1", "2", "3", "4", "5", "6", "7", "8", "9"] as const;
const digitWords = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
] as const;

type Digit = (typeof digits)[number];
type DigitWord = (typeof digitWords)[number];

const digitsMap = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
};

function isDigit(s: string): s is Digit {
  return digits.includes(s as Digit);
}

function isDigitWord(s: string): s is DigitWord {
  return digitWords.includes(s as DigitWord);
}

function convertWordToDigit(word: string) {
  if (isDigit(word)) return word;
  if (isDigitWord(word)) return digitsMap[word];

  throw new Error(`cannot convert ${word} to digit`);
}

export async function solve() {
  const calibration = await parseInput();

  const reversedWords = digitWords.map((w) => utils.reverseString(w));

  const pattern = new RegExp(`[1-9]|${digitWords.join("|")}`, "g");
  const reversedPattern = new RegExp(`[1-9]|${reversedWords.join("|")}`, "g");

  const corrected = calibration.map((c) => {
    const revC = utils.reverseString(c);

    const matches = c.match(pattern);
    const revMatches = revC.match(reversedPattern);

    if (!matches || !revMatches) throw new Error("no matches found");

    const first = matches[0];
    const last = utils.reverseString(revMatches[0]);

    return parseInt(
      `${convertWordToDigit(first)}${convertWordToDigit(last)}`,
      10,
    );
  });

  return corrected.reduce((sum, d) => sum + d, 0);
}
