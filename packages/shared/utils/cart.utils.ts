
export function normalizeArray(
  arr: string[] | null | undefined
): string[] | null {
  if (!arr || arr.length === 0) return null;
  return [...arr].sort();
}

export function itemsMatch(
  item1: { dishId: string; sides: string[] | null; changes: string[] | null },
  item2: { dishId: string; sides: string[] | null; changes: string[] | null }
): boolean {
  if (item1.dishId !== item2.dishId) return false;

  return (
    JSON.stringify(item1.sides) === JSON.stringify(item2.sides) &&
    JSON.stringify(item1.changes) === JSON.stringify(item2.changes)
  );
}
