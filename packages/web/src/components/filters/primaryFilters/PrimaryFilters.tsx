'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useTranslation } from '../../../hooks/useTranslation';
import {
  FilterOption,
  primaryFilterOptions,
} from '../../../app/types/filters.types';
import styles from './PrimaryFilters.module.scss';

export interface PrimaryFiltersProps {
  activeFilter: FilterOption;
}

export default function PrimaryFilters({ activeFilter }: PrimaryFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const filters = useTranslation('restaurants.filters');
  const filterOptions = primaryFilterOptions;

  const handleFilterClick = (filter: FilterOption) => {
    // Create new URLSearchParams object from current search params
    const params = new URLSearchParams(searchParams.toString());

    // Only add filter param if it's not 'all' (cleaner URLs)
    if (filter === 'all') {
      params.delete('filter');
    } else {
      params.set('filter', filter);
    }

    // Construct new URL with updated params
    const newUrl = params.toString()
      ? `${pathname}?${params.toString()}`
      : pathname;

    // Update URL using router.replace (no history entry)
    router.replace(newUrl);
  };

  const getFilterLabel = (filter: FilterOption): string => {
    return filters[filter] || '';
  };

  return (
    <div className={styles.filters}>
      {filterOptions.map((filter) => (
        <button
          key={filter}
          className={`${styles.filterButton} ${
            activeFilter === filter ? styles.active : ''
          }`}
          onClick={() => handleFilterClick(filter)}
        >
          {getFilterLabel(filter)}
        </button>
      ))}
    </div>
  );
}
