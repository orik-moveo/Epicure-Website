'use client';

import { useTranslation } from '../../../../hooks/useTranslation';
import RangeFilter from '../RangeFilter/RangeFilter';

export default function PriceRangeFilter() {
  const translations = useTranslation('restaurants.secondaryFilters');

  const min = 0;
  const max = 500;

  return (
    <RangeFilter
      label={translations.priceRange || 'Price Range'}
      queryParam="priceRange"
      min={min}
      max={max}
      initialValue={[min, max]}
      formatValue={(v) => `₪${v}`}
      titleKey={translations.priceRangeSelected || 'Price Range Selected'}
    />
  );
}
