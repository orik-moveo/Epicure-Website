'use client';

import { useIsMobile } from '../../../hooks/useIsMobile';
import styles from '../authDialog.module.scss';

interface CloseButtonProps {
  onClose: () => void;
}

export default function CloseButton({ onClose }: CloseButtonProps) {
  const isMobile = useIsMobile();

  if (!isMobile) {
    return (
      <div className={styles.closeButtonRow}>
        <button className={styles.closeButton} onClick={onClose}>
          <img
            src="/assets/icons/x-white.svg"
            alt="Close"
            className={styles.closeIconDesktop}
          />
        </button>
      </div>
    );
  }

  return (
    <div className={styles.closeButtonRow}>
      <button className={styles.closeButton} onClick={onClose}>
        <img
          src="/assets/icons/x.svg"
          alt="Close"
          className={styles.closeIconMobile}
        />
      </button>
    </div>
  );
}
