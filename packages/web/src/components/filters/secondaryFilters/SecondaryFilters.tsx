'use client';

import { useIsMobile } from '../../../hooks/useIsMobile';
import { secondaryFilterOptions } from '../../../app/types/secondaryFilters.types';
import RatingFilter from './RatingFilter/RatingFilter';
import PriceRangeFilter from './PriceRangeFilter/PriceRangeFilter';
import DistanceFilter from './DistanceFilter/DistanceFilter';
import styles from './SecondaryFilters.module.scss';

export interface SecondaryFiltersProps {
  // Reserved for future functionality
}

export default function SecondaryFilters({}: SecondaryFiltersProps) {
  const isMobile = useIsMobile();

  if (isMobile === null) {
    return null;
  }

  return (
    <div className={isMobile ? styles.mobile : styles.desktop}>
      {secondaryFilterOptions.map((filter) => {
        if (filter === 'rating') {
          return <RatingFilter key={filter} />;
        }

        if (filter === 'priceRange') {
          return <PriceRangeFilter key={filter} />;
        }

        if (filter === 'distance') {
          return <DistanceFilter key={filter} />;
        }

        return null;
      })}
    </div>
  );
}
