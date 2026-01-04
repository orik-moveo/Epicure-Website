import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { parseRangeParam } from '../../utils/filterRestaurants';
import {
  getInitialRange,
  normalizeRangeForSingleHandle,
} from '../helpers/rangeHelpers';

interface UseRangeFromUrlParams {
  queryParam: string;
  min: number;
  max: number;
  initialValue?: [number, number];
  singleHandle?: boolean;
}

export function useRangeFromUrl({
  queryParam,
  min,
  max,
  initialValue,
  singleHandle = false,
}: UseRangeFromUrlParams): [[number, number], (range: [number, number]) => void] {
  const searchParams = useSearchParams();
  const [range, setRange] = useState<[number, number]>(() =>
    getInitialRange(min, max, initialValue, singleHandle)
  );

  useEffect(() => {
    const param = searchParams.get(queryParam);
    const parsed = parseRangeParam(param);

    if (parsed) {
      const newRange = normalizeRangeForSingleHandle(parsed, min, singleHandle);
      setRange((prevRange) => {
        if (prevRange[0] !== newRange[0] || prevRange[1] !== newRange[1]) {
          return newRange;
        }
        return prevRange;
      });
    } else {
      const defaultRange = getInitialRange(min, max, initialValue, singleHandle);
      setRange((prevRange) => {
        if (
          prevRange[0] !== defaultRange[0] ||
          prevRange[1] !== defaultRange[1]
        ) {
          return defaultRange;
        }
        return prevRange;
      });
    }
  }, [
    searchParams.toString(),
    queryParam,
    min,
    max,
    initialValue,
    singleHandle,
  ]);

  return [range, setRange];
}

