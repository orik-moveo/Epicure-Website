'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginFormData, loginSchema } from './schemas';
import { login } from '@/lib/api';
import { useTranslation } from '../../hooks/useTranslation';
import styles from './authDialog.module.scss';
import FormInput from './formInput';

interface SignInFormProps {
  onSuccess: () => void;
  onSwitchToSignUp: () => void;
}

export default function SignInForm({
  onSuccess,
  onSwitchToSignUp,
}: SignInFormProps) {
  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });
  const form = useTranslation('auth.form');
  const dialog = useTranslation('auth.dialog');
  const errorsT = useTranslation('auth.errors');

  const email = watch('email');
  const password = watch('password');

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data);
      onSuccess();
    } catch (err) {
      setError('root', {
        message: errorsT.invalidCredentials,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.inputsBox}>
      <div className={styles.subtitleBox}>
        <h2 className={styles.subtitleTitle}>{dialog.titleSignIn}</h2>
        <p className={styles.subtitleText}>{dialog.signInSubtitle}</p>
      </div>

      <FormInput
        name="email"
        label={form.email}
        type="email"
        register={register}
        errors={errors}
        value={email}
      />

      <FormInput
        name="password"
        label={form.password}
        type="password"
        register={register}
        errors={errors}
        value={password}
      />

      {errors.root && <p className={styles.rootError}>{errors.root.message}</p>}

      <button
        type="submit"
        disabled={isSubmitting || !isValid}
        className={`${styles.submitButton} ${isValid ? styles.active : ''}`}
      >
        {isSubmitting ? form.signingIn : form.login}
      </button>

      <button type="button" className={styles.forgetPassword}>
        {dialog.forgetPassword}
      </button>

      <div className={styles.orRow}>
        <div className={styles.orLine}></div>
        <span className={styles.orText}>{dialog.or}</span>
        <div className={styles.orLine}></div>
      </div>

      <button
        type="button"
        onClick={onSwitchToSignUp}
        className={styles.switchButton}
      >
        {dialog.titleSignUp}
      </button>
    </form>
  );
}
