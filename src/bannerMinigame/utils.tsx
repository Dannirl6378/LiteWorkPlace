export function generateXGrid(size: number): [number, number] | null {
  if (size < 3) {
    return null; 
  }
  const x = Math.floor(Math.random() * size);
  const y = Math.floor(Math.random() * size);
  return [x, y];
}
