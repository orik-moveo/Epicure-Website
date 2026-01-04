'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Slider } from '@mui/material';
import { useIsMobile } from '../../../../hooks/useIsMobile';
import { useDropdown } from '../../../../hooks/useDropdown';
import { ClickAwayListener } from '@mui/material';
import FilterToggleButton from '../../../ui/FilterToggleButton/FilterToggleButton';
import {
  parseRangeParam,
  formatRangeForUrl,
  isDefaultRange,
} from '../utils/filterRestaurants';
import { useTranslation } from '../../../../hooks/useTranslation';
import styles from './RangeFilter.module.scss';

export interface RangeFilterProps {
  label: string;
  queryParam: string;
  min: number;
  max: number;
  initialValue?: [number, number];
  formatValue?: (value: number) => string;
  titleKey?: string;
  step?: number;
}

export default function RangeFilter({
  label,
  queryParam,
  min,
  max,
  initialValue,
  formatValue = (v) => v.toString(),
  titleKey,
  step = 1,
}: RangeFilterProps) {
  const isMobile = useIsMobile();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { isOpen, toggle, close } = useDropdown();
  const translations = useTranslation('restaurants.secondaryFilters');

  const [range, setRange] = useState<[number, number]>(
    initialValue || [min, max]
  );
  const [isClearPressed, setIsClearPressed] = useState(false);

  useEffect(() => {
    const param = searchParams.get(queryParam);
    const parsed = parseRangeParam(param);
    setRange(parsed || initialValue || [min, max]);
  }, [searchParams, queryParam, initialValue, min, max]);

  const updateUrl = (newRange: [number, number]) => {
    const params = new URLSearchParams(searchParams.toString());

    if (isDefaultRange(newRange, min, max, initialValue)) {
      params.delete(queryParam);
    } else {
      params.set(queryParam, formatRangeForUrl(newRange));
    }

    const newUrl = params.toString()
      ? `${pathname}?${params.toString()}`
      : pathname;

    router.replace(newUrl);
  };

  const handleChange = (_event: Event, newValue: number | number[]) => {
    const [minVal, maxVal] = newValue as number[];
    setRange([minVal, maxVal]);
  };

  const handleChangeCommitted = (
    _event: Event | React.SyntheticEvent,
    newValue: number | number[]
  ) => {
    const [minVal, maxVal] = newValue as number[];
    updateUrl([minVal, maxVal]);
  };

  const handleClear = () => {
    setIsClearPressed(true);
    const defaultRange: [number, number] = initialValue || [min, max];
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
            <div className={styles.subtitle}>
              {formatValue(min)} – {formatValue(max)}
            </div>
            <div className={styles.sliderContainer}>
              <div className={styles.currentMinValue}>
                {formatValue(range[0])}
              </div>
              <div className={styles.sliderWrapper}>
                <Slider
                  min={min}
                  max={max}
                  step={step}
                  value={range}
                  onChange={handleChange}
                  onChangeCommitted={handleChangeCommitted}
                  valueLabelDisplay="off"
                  className={styles.slider}
                />
              </div>
              <div className={styles.currentMaxValue}>
                {formatValue(range[1])}
              </div>
            </div>
            <button
              className={`${styles.clearButton} ${
                isClearPressed ? styles.clearButtonActive : ''
              }`}
              onClick={handleClear}
            >
              {translations.clear || 'CLEAR'}
            </button>
          </div>
        )}
      </div>
    </ClickAwayListener>
  );
}
