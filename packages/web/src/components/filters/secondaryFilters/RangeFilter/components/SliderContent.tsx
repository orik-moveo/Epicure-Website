import { Slider } from '@mui/material';
import styles from '../RangeFilter.module.scss';
import { extractSliderValue } from '../helpers/rangeHelpers';

interface SliderContentProps {
  range: [number, number];
  min: number;
  max: number;
  stepSize: number;
  singleHandle: boolean;
  leftLabel?: string;
  formatValue: (value: number) => string;
  hideSubtitle?: boolean;
  onChange: (newRange: [number, number]) => void;
  onChangeCommitted: (newRange: [number, number]) => void;
}

export default function SliderContent({
  range,
  min,
  max,
  stepSize,
  singleHandle,
  leftLabel,
  formatValue,
  hideSubtitle = false,
  onChange,
  onChangeCommitted,
}: SliderContentProps) {
  const handleChange = (_event: Event, newValue: number | number[]) => {
    const newRange = extractSliderValue(newValue, min, singleHandle);
    onChange(newRange);
  };

  const handleChangeCommitted = (
    _event: Event | React.SyntheticEvent,
    newValue: number | number[]
  ) => {
    const newRange = extractSliderValue(newValue, min, singleHandle);
    onChangeCommitted(newRange);
  };

  return (
    <>
      <div className={styles.subtitle}>
        {!hideSubtitle && `${formatValue(min)} – ${formatValue(max)}`}
      </div>
      <div className={styles.sliderContainer}>
        <div className={styles.currentMinValue}>
          {leftLabel || formatValue(range[0])}
        </div>
        <div className={styles.sliderWrapper}>
          {singleHandle && <div className={styles.fixedLeftThumb} />}
          <Slider
            min={min}
            max={max}
            step={stepSize}
            value={singleHandle ? range[1] : range}
            onChange={handleChange}
            onChangeCommitted={handleChangeCommitted}
            valueLabelDisplay="off"
            className={styles.slider}
          />
        </div>
        <div className={styles.currentMaxValue}>{formatValue(range[1])}</div>
      </div>
    </>
  );
}
