'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Slider } from '@mui/material';
import { useIsMobile } from '../../../../hooks/useIsMobile';
import { useDropdown } from '../../../../hooks/useDropdown';
import { ClickAwayListener } from '@mui/material';
import FilterToggleButton from '../../../ui/FilterToggleButton/FilterToggleButton';
import { RangeFilterProps } from '../../../../app/types/filters.types';
import {
  parseRangeParam,
  formatRangeForUrl,
  isDefaultRange,
} from '../utils/filterRestaurants';
import styles from './RangeFilter.module.scss';

export default function RangeFilter({
  label,
  queryParam,
  min,
  max,
  initialValue,
  formatValue = (v) => v.toString(),
  titleKey,
}: RangeFilterProps) {
  const isMobile = useIsMobile();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { isOpen, toggle, close } = useDropdown();

  const [range, setRange] = useState<[number, number]>(
    initialValue || [min, max]
  );

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
              {formatValue(range[0])} – {formatValue(range[1])}
            </div>
            <div className={styles.sliderContainer}>
              <Slider
                min={min}
                max={max}
                value={range}
                onChange={handleChange}
                onChangeCommitted={handleChangeCommitted}
                valueLabelDisplay="off"
                className={styles.slider}
              />
            </div>
          </div>
        )}
      </div>
    </ClickAwayListener>
  );
}
