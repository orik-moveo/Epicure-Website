/**
 * Helper functions for range filter logic
 */

export function getInitialRange(
  min: number,
  max: number,
  initialValue?: [number, number],
  singleHandle?: boolean
): [number, number] {
  const initial = initialValue || [min, max];
  return singleHandle ? [min, initial[1]] : initial;
}

export function normalizeRangeForSingleHandle(
  range: [number, number],
  min: number,
  singleHandle: boolean
): [number, number] {
  return singleHandle ? [min, range[1]] : range;
}

export function extractSliderValue(
  newValue: number | number[],
  min: number,
  singleHandle: boolean
): [number, number] {
  if (singleHandle) {
    const maxVal = newValue as number;
    return [min, maxVal];
  } else {
    const [minVal, maxVal] = newValue as number[];
    return [minVal, maxVal];
  }
}

