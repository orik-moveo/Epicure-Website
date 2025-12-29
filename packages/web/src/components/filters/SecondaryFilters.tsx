'use client';

import { useIsMobile } from '../../hooks/useIsMobile';
import { useTranslation } from '../../hooks/useTranslation';
import styles from './SecondaryFilters.module.scss';

export interface SecondaryFiltersProps {
  // Reserved for future functionality
}

export default function SecondaryFilters({}: SecondaryFiltersProps) {
  const isMobile = useIsMobile();
  const filters = useTranslation('restaurants.secondaryFilters');

  if (isMobile === null) {
    return null;
  }

  const filterOptions = ['priceRange', 'distance', 'rating'];

  const getFilterLabel = (filter: string): string => {
    return filters[filter] || '';
  };

  return (
    <div className={isMobile ? styles.mobile : styles.desktop}>
      {filterOptions.map((filter) => (
        <button
          key={filter}
          className={styles.filterButton}
          onClick={() => {
            // Reserved for future dropdown logic
          }}
        >
          {getFilterLabel(filter)}
          <img
            src="/assets/icons/arrow.svg"
            alt=""
            className={styles.arrowIcon}
          />
        </button>
      ))}
    </div>
  );
}

