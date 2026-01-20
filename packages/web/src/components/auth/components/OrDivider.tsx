'use client';

import styles from '../authDialog.module.scss';

interface OrDividerProps {
  text: string;
}

export default function OrDivider({ text }: OrDividerProps) {
  return (
    <div className={styles.orRow}>
      <div className={styles.orLine}></div>
      <span className={styles.orText}>{text}</span>
      <div className={styles.orLine}></div>
    </div>
  );
}
