export function inRange(num: number, lower: number, upper: number) {
  return num >= lower && num <= upper;
}

export function reverseString(s: string) {
  return s.split("").reverse().join("");
}