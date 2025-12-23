'use client';

import { useIsMobile } from '../../../hooks/useIsMobile';
import { useTranslation } from '../../../hooks/useTranslation';
import styles from './IconLegend.module.scss';

export default function IconLegend() {
  const isMobile = useIsMobile();
  const iconLegend = useTranslation('iconLegend');

  if (isMobile === null) {
    return null;
  }

  const dietTypes = [
    { type: 'spicy', label: iconLegend.spicy },
    { type: 'vegetarian', label: iconLegend.vegetarian },
    { type: 'vegan', label: iconLegend.vegan },
  ];

  return (
    <section className={isMobile ? styles.mobile : styles.desktop}>
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

