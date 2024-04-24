export function padDay(day: string) {
  return day.padStart(2, "0");
}

export async function readInput(dir: string, example: "example" | undefined) {
  const file = `${dir}/input${example ? "-example" : ""}.txt`;
  const input = await Bun.file(file).text();

  return input.trim();
}
