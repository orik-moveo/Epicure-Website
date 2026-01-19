'use client';

import styles from '../authDialog.module.scss';

interface FormHeaderProps {
  title: string;
  subtitle: string;
}

export default function FormHeader({ title, subtitle }: FormHeaderProps) {
  return (
    <div className={styles.subtitleBox}>
      <h2 className={styles.subtitleTitle}>{title}</h2>
      <p className={styles.subtitleText}>{subtitle}</p>
    </div>
  );
}
