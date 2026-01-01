'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { parseRatingParam } from '../components/filters/secondaryFilters/utils/filterRestaurants';

export function useRatingFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);

  // Sync selected ratings from URL on mount and when URL changes
  useEffect(() => {
    const ratingParam = searchParams.get('rating');
    const ratings = parseRatingParam(ratingParam);
    setSelectedRatings(ratings);
  }, [searchParams]);

  const updateUrlParams = (ratings: number[]) => {
    const params = new URLSearchParams(searchParams.toString());

    if (ratings.length === 0) {
      params.delete('rating');
    } else {
      // Sort ratings in descending order for consistent URL format
      const sortedRatings = [...ratings].sort((a, b) => b - a);
      params.set('rating', sortedRatings.join(','));
    }

    const newUrl = params.toString()
      ? `${pathname}?${params.toString()}`
      : pathname;

    router.replace(newUrl);
  };

  const handleRatingToggle = (rating: number) => {
    const newSelectedRatings = selectedRatings.includes(rating)
      ? selectedRatings.filter((r) => r !== rating)
      : [...selectedRatings, rating];

    setSelectedRatings(newSelectedRatings);
    updateUrlParams(newSelectedRatings);
  };

  return {
    selectedRatings,
    handleRatingToggle,
  };
}
