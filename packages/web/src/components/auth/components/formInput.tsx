'use client';

import {
  UseFormRegister,
  FieldErrors,
  FieldValues,
  Path,
} from 'react-hook-form';
import styles from '../authDialog.module.scss';

interface FormInputProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  type?: string;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  value?: string;
}

export default function FormInput<T extends FieldValues>({
  name,
  label,
  type = 'text',
  register,
  errors,
  value,
}: FormInputProps<T>) {
  const error = errors[name];
  const hasValue = !!value;

  return (
    <div className={styles.inputContainer}>
      <div className={styles.inputWrapper}>
        <input
          type={type}
          className={`${styles.input} ${error ? styles.inputErrorState : ''} ${
            hasValue ? styles.hasValue : ''
          }`.trim()}
          placeholder=" "
          {...register(name)}
        />
        <label className={styles.inputLabel}>{label}</label>
      </div>
      {error && <p className={styles.inputError}>{error.message as string}</p>}
    </div>
  );
}
