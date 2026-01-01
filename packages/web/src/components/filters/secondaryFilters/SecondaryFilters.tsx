'use client';

import Image from 'next/image';
import { useIsMobile } from '../../../hooks/useIsMobile';
import { useTranslation } from '../../../hooks/useTranslation';
import { secondaryFilterOptions } from '../../../app/types/secondaryFilters.types';
import RatingFilter from './RatingFilter/RatingFilter';
import styles from './SecondaryFilters.module.scss';

export interface SecondaryFiltersProps {
  // Reserved for future functionality
}

export default function SecondaryFilters({}: SecondaryFiltersProps) {
  const isMobile = useIsMobile();
  const filters = useTranslation('restaurants.secondaryFilters');
  const filterOptions = secondaryFilterOptions;

  if (isMobile === null) {
    return null;
  }

  const getFilterLabel = (filter: string): string => {
    return filters[filter] || '';
  };

  return (
    <div className={isMobile ? styles.mobile : styles.desktop}>
      {filterOptions.map((filter) => {
        // Render RatingFilter component for 'rating' filter
        if (filter === 'rating') {
          return <RatingFilter key={filter} />;
        }

        // Keep other filters as placeholder buttons
        return (
          <button key={filter} className={styles.filterButton}>
            {getFilterLabel(filter)}
            <Image
              src="/assets/icons/arrow.svg"
              alt=""
              width={24}
              height={24}
              className={styles.arrowIcon}
            />
          </button>
        );
      })}
    </div>
  );
}
