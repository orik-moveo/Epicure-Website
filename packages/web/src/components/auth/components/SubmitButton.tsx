'use client';

import styles from '../authDialog.module.scss';

interface SubmitButtonProps {
  isSubmitting: boolean;
  isValid: boolean;
  loadingText: string;
  submitText: string;
}

export default function SubmitButton({
  isSubmitting,
  isValid,
  loadingText,
  submitText,
}: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={isSubmitting || !isValid}
      className={`${styles.submitButton} ${isValid ? styles.active : ''}`}
    >
      {isSubmitting ? loadingText : submitText}
    </button>
  );
}
