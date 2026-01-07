'use client';

import { secondaryFilterOptions } from '../../../app/types/secondaryFilters.types';
import RatingFilter from './RatingFilter/RatingFilter';
import PriceRangeFilter from './PriceRangeFilter/PriceRangeFilter';
import DistanceFilter from './DistanceFilter/DistanceFilter';
import styles from './SecondaryFilters.module.scss';

export interface SecondaryFiltersProps {
  // Reserved for future functionality
}

export default function SecondaryFilters({}: SecondaryFiltersProps) {
  return (
    <div className={styles.filters}>
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
