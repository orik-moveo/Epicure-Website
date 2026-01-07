'use client';

import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import styles from './AboutUs.module.scss';

interface AboutUsProps {
  title: string;
  description: any;
}

export default function AboutUs({ title, description }: AboutUsProps) {
  return (
    <section className={styles.section}>
      <div className={styles.logoContainer}>
        <img
          src="/assets/icons/about-logo.svg"
          alt="About Us Logo"
          className={styles.logo}
        />
      </div>
      <div className={styles.iconsContainer}>
        <img
          src="/assets/icons/appstore.svg"
          alt="App Store"
          className={styles.storeIcon}
        />
        <img
          src="/assets/icons/googleplay.svg"
          alt="Google Play"
          className={styles.storeIcon}
        />
      </div>
      <div className={styles.textSection}>
        <h2 className={styles.title}>{title}</h2>
        {description && (
          <div className={styles.description}>
            <BlocksRenderer content={description} />
          </div>
        )}
        <div className={styles.iconsContainerDesktop}>
          <img
            src="/assets/icons/appstore.svg"
            alt="App Store"
            className={styles.storeIcon}
          />
          <img
            src="/assets/icons/googleplay.svg"
            alt="Google Play"
            className={styles.storeIcon}
          />
        </div>
      </div>
    </section>
  );
}
