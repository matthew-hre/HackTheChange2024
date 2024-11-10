export function random(seed: number) {
  const x = Math.sin(Math.sqrt(seed)) * 10000;
  const result = x - Math.floor(x);
  return result;
}
