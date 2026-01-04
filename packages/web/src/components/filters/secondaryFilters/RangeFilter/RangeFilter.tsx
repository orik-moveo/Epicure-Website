'use client';

import { useState } from 'react';
import { useIsMobile } from '../../../../hooks/useIsMobile';
import { useDropdown } from '../../../../hooks/useDropdown';
import { ClickAwayListener } from '@mui/material';
import FilterToggleButton from '../../../ui/FilterToggleButton/FilterToggleButton';
import { useTranslation } from '../../../../hooks/useTranslation';
import { useRangeFromUrl } from './hooks/useRangeFromUrl';
import { useUrlUpdater } from './hooks/useUrlUpdater';
import { getInitialRange } from './helpers/rangeHelpers';
import ErrorDisplay from './components/ErrorDisplay';
import SliderContent from './components/SliderContent';
import styles from './RangeFilter.module.scss';

export interface RangeFilterProps {
  label: string;
  queryParam: string;
  min: number;
  max: number;
  initialValue?: [number, number];
  formatValue?: (value: number) => string;
  titleKey?: string;
  stepSize?: number;
  singleHandle?: boolean;
  leftLabel?: string;
  hideSubtitle?: boolean;
  error?: string;
  onRetryLocation?: () => void;
  isLoadingLocation?: boolean;
}

export default function RangeFilter({
  label,
  queryParam,
  min,
  max,
  initialValue,
  formatValue = (v) => v.toString(),
  titleKey,
  stepSize = 1,
  singleHandle = false,
  leftLabel,
  hideSubtitle = false,
  error,
  onRetryLocation,
  isLoadingLocation = false,
}: RangeFilterProps) {
  const isMobile = useIsMobile();
  const { isOpen, toggle, close } = useDropdown();
  const translations = useTranslation('restaurants.secondaryFilters');

  const [range, setRange] = useRangeFromUrl({
    queryParam,
    min,
    max,
    initialValue,
    singleHandle,
  });
  const [isClearPressed, setIsClearPressed] = useState(false);
  const updateUrl = useUrlUpdater({ queryParam, min, max, initialValue });

  const handleChange = (newRange: [number, number]) => {
    setRange(newRange);
  };

  const handleChangeCommitted = (newRange: [number, number]) => {
    updateUrl(newRange);
  };

  const handleClear = () => {
    setIsClearPressed(true);
    const defaultRange = getInitialRange(min, max, initialValue, singleHandle);
    setRange(defaultRange);
    updateUrl(defaultRange);
    setTimeout(() => setIsClearPressed(false), 200);
  };

  if (isMobile === null) {
    return null;
  }

  return (
    <ClickAwayListener onClickAway={close}>
      <div className={isMobile ? styles.mobile : styles.desktop}>
        <FilterToggleButton
          label={label}
          isOpen={isOpen}
          onClick={toggle}
          isMobile={isMobile}
        />

        {isOpen && (
          <div className={styles.dropdown}>
            {titleKey && <h3 className={styles.title}>{titleKey}</h3>}
            {error ? (
              <ErrorDisplay
                error={error}
                onRetry={onRetryLocation}
                isLoading={isLoadingLocation}
              />
            ) : (
              <>
                <SliderContent
                  range={range}
                  min={min}
                  max={max}
                  stepSize={stepSize}
                  singleHandle={singleHandle}
                  leftLabel={leftLabel}
                  formatValue={formatValue}
                  hideSubtitle={hideSubtitle}
                  onChange={handleChange}
                  onChangeCommitted={handleChangeCommitted}
                />
                <button
                  className={`${styles.clearButton} ${
                    isClearPressed ? styles.clearButtonActive : ''
                  }`}
                  onClick={handleClear}
                >
                  {translations.clear || 'CLEAR'}
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </ClickAwayListener>
  );
}
