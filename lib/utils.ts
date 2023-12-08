export function inRange(num: number, lower: number, upper: number) {
  return num >= lower && num <= upper;
}

export function reverseString(s: string) {
  return s.split("").reverse().join("");
}

export function stringIsInt(s: string) {
  return !isNaN(parseInt(s, 10));
}

export function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

export function lcm(a: number, b: number) {
  return (a * b) / gcd(a, b);
}
