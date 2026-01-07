'use client';

import { useTranslation } from '../../../hooks/useTranslation';
import styles from './IconLegend.module.scss';

export default function IconLegend() {
  const iconLegend = useTranslation('iconLegend');

  const dietTypes = [
    { type: 'spicy', label: iconLegend.spicy },
    { type: 'vegetarian', label: iconLegend.vegetarian },
    { type: 'vegan', label: iconLegend.vegan },
  ];

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>{iconLegend.title}</h2>
      <div className={styles.iconsContainer}>
        {dietTypes.map((dietType) => (
          <div key={dietType.type} className={styles.iconItem}>
            <img
              src={`/assets/icons/${dietType.type}.svg`}
              alt={dietType.label}
              className={styles.icon}
            />
            <span className={styles.label}>{dietType.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
