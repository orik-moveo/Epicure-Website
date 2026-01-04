'use client';

import { useTranslation } from '../../../../hooks/useTranslation';
import RangeFilter from '../RangeFilter/RangeFilter';

export default function PriceRangeFilter() {
  const translations = useTranslation('restaurants.secondaryFilters');

  const MIN = 0;
  const MAX = 500;

  return (
    <RangeFilter
      label={translations.priceRange || 'Price Range'}
      queryParam="priceRange"
      min={MIN}
      max={MAX}
      initialValue={[MIN, MAX]}
      formatValue={(v) => `₪${v}`}
      titleKey={translations.priceRangeSelected || 'Price Range Selected'}
      stepSize={10}
    />
  );
}
