'use client';

import styles from '../authDialog.module.scss';

interface SwitchButtonProps {
  text: string;
  onClick: () => void;
}

export default function SwitchButton({ text, onClick }: SwitchButtonProps) {
  return (
    <button type="button" onClick={onClick} className={styles.switchButton}>
      {text}
    </button>
  );
}
