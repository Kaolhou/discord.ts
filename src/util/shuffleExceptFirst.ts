export default function shuffleExceptFirst<T>(array: T[]): T[] {
  if (array.length == 0) return [];
  const first = array.shift();
  array.sort(() => Math.random() - 0.5);
  array.unshift(first!);
  return array;
}
