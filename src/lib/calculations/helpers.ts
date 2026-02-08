export function roundToCents(value: number) {
  let rounded = Math.round(value * 100) / 100;
  return rounded;
}
