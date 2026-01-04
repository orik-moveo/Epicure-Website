import { useTranslation } from '../../../../../hooks/useTranslation';
import styles from '../RangeFilter.module.scss';

interface ErrorDisplayProps {
  error: string;
  onRetry?: () => void;
  isLoading?: boolean;
}

export default function ErrorDisplay({
  error,
  onRetry,
  isLoading = false,
}: ErrorDisplayProps) {
  const translations = useTranslation('restaurants.secondaryFilters');

  return (
    <div className={styles.errorContainer}>
      <p className={styles.errorMessage}>{error}</p>
      {onRetry && (
        <button
          className={styles.shareLocationButton}
          onClick={onRetry}
          disabled={isLoading}
        >
          {isLoading
            ? 'Loading...'
            : translations.shareLocation || 'Share Location'}
        </button>
      )}
    </div>
  );
}

