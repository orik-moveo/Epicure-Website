'use client';

import { useIsMobile } from '../../../../hooks/useIsMobile';
import { useTranslation } from '../../../../hooks/useTranslation';
import { useRatingFilter } from '../../../../hooks/useRatingFilter';
import { useDropdown } from '../../../../hooks/useDropdown';
import FilterToggleButton from '../../../ui/FilterToggleButton/FilterToggleButton';
import { renderStars } from '../../../restaurants/restaurants.utils';
import styles from './RatingFilter.module.scss';

export default function RatingFilter() {
  const isMobile = useIsMobile();
  const translations = useTranslation('restaurants.secondaryFilters');
  const { selectedRatings, handleRatingToggle } = useRatingFilter();
  const { isOpen, toggle, dropdownRef } = useDropdown();

  if (isMobile === null) {
    return null;
  }

  const ratingOptions = [1, 2, 3, 4, 5];

  return (
    <div
      ref={dropdownRef}
      className={isMobile ? styles.mobile : styles.desktop}
    >
      <FilterToggleButton
        label={translations.rating || 'Rating'}
        isOpen={isOpen}
        onClick={toggle}
        isMobile={isMobile}
      />

      {isOpen && (
        <div className={styles.dropdown}>
          <h3 className={styles.title}>{translations.rating || 'Rating'}</h3>
          {ratingOptions.map((rating) => (
            <div
              key={rating}
              className={styles.ratingRow}
              onClick={() => handleRatingToggle(rating)}
            >
              <input
                type="checkbox"
                checked={selectedRatings.includes(rating)}
                readOnly
                className={styles.checkbox}
                aria-label={`${rating} star rating`}
              />
              <div className={styles.starsContainer}>
                {renderStars({ rating, starClassName: styles.star })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
