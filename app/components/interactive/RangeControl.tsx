"use client";

import styles from "./Interactive.module.css";

type RangeControlProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  formatValue?: (value: number) => string;
};

export function RangeControl({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  formatValue = String,
}: RangeControlProps) {
  return (
    <label className={styles.rangeControl}>
      <span className={styles.rangeHeader}>
        <span className={styles.rangeLabel}>{label}</span>
        <span className={styles.rangeValue}>{formatValue(value)}</span>
      </span>
      <input
        aria-label={label}
        className={styles.rangeInput}
        max={max}
        min={min}
        onChange={(event) => onChange(Number(event.target.value))}
        step={step}
        type="range"
        value={value}
      />
    </label>
  );
}
