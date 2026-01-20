'use client';

import { useIsMobile } from '../../../hooks/useIsMobile';
import styles from '../authDialog.module.scss';

interface CloseButtonProps {
  onClose: () => void;
}

export default function CloseButton({ onClose }: CloseButtonProps) {
  const isMobile = useIsMobile();

  return (
    <div className={styles.closeButtonRow}>
      <button className={styles.closeButton} onClick={onClose}>
        <img
          src={isMobile ? '/assets/icons/x.svg' : '/assets/icons/x-white.svg'}
          alt="Close"
          className={
            isMobile ? styles.closeIconMobile : styles.closeIconDesktop
          }
        />
      </button>
    </div>
  );
}
