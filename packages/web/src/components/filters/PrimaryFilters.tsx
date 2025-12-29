'use client';

import { useState } from 'react';
import { useIsMobile } from '../../hooks/useIsMobile';
import { useTranslation } from '../../hooks/useTranslation';
import {
  FilterOption,
  primaryFilterOptions,
} from '../../app/types/filters.types';
import styles from './PrimaryFilters.module.scss';

export interface PrimaryFiltersProps {
  defaultFilter?: FilterOption;
  onFilterChange?: (filter: FilterOption) => void;
}

export default function PrimaryFilters({
  defaultFilter = 'all',
  onFilterChange,
}: PrimaryFiltersProps) {
  const isMobile = useIsMobile();
  const filters = useTranslation('restaurants.filters');
  const [activeFilter, setActiveFilter] = useState<FilterOption>(defaultFilter);
  const filterOptions = primaryFilterOptions;

  if (isMobile === null) {
    return null;
  }

  const handleFilterClick = (filter: FilterOption) => {
    setActiveFilter(filter);
    onFilterChange?.(filter);
  };

  const getFilterLabel = (filter: FilterOption): string => {
    return filters[filter] || '';
  };

  return (
    <div className={isMobile ? styles.mobile : styles.desktop}>
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
