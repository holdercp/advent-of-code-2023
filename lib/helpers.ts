export function padDay(day: string) {
  return day.padStart(2, "0");
}

export function inRange(num: number, lower: number, upper: number) {
  return num >= lower && num <= upper;
}
