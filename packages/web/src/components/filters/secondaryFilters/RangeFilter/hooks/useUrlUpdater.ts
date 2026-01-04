import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { formatRangeForUrl, isDefaultRange } from '../../utils/filterRestaurants';

interface UseUrlUpdaterParams {
  queryParam: string;
  min: number;
  max: number;
  initialValue?: [number, number];
}

export function useUrlUpdater({
  queryParam,
  min,
  max,
  initialValue,
}: UseUrlUpdaterParams) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateUrl = (newRange: [number, number]) => {
    const params = new URLSearchParams(searchParams.toString());

    if (isDefaultRange(newRange, min, max, initialValue)) {
      params.delete(queryParam);
    } else {
      params.set(queryParam, formatRangeForUrl(newRange));
    }

    const newUrl = params.toString()
      ? `${pathname}?${params.toString()}`
      : pathname;

    router.replace(newUrl);
  };

  return updateUrl;
}

