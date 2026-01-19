'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterFormData, registerSchema } from './schemas';
import { useForm } from 'react-hook-form';
import { useTranslation } from '../../hooks/useTranslation';
import styles from './authDialog.module.scss';
import FormInput from './formInput';
import { useAuth } from '@/hooks/useAuth';

interface SignUpFormProps {
  onSuccess: () => void;
  onSwitchToSignIn: () => void;
}

export default function SignUpForm({
  onSuccess,
  onSwitchToSignIn,
}: SignUpFormProps) {
  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });
  const form = useTranslation('auth.form');
  const dialog = useTranslation('auth.dialog');
  const errorsT = useTranslation('auth.errors');
  const { register: registerUser } = useAuth();

  const firstName = watch('firstName');
  const lastName = watch('lastName');
  const email = watch('email');
  const password = watch('password');

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerUser(data);
      onSuccess();
    } catch (err) {
      setError('root', {
        message: errorsT.registrationFailed,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.inputsBox}>
      <div className={styles.subtitleBox}>
        <h2 className={styles.subtitleTitle}>{dialog.titleSignUp}</h2>
        <p className={styles.subtitleText}>{dialog.signUpSubtitle}</p>
      </div>

      <FormInput
        name="firstName"
        label={form.firstName}
        register={register}
        errors={errors}
        value={firstName}
      />

      <FormInput
        name="lastName"
        label={form.lastName}
        register={register}
        errors={errors}
        value={lastName}
      />

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
        {isSubmitting ? form.signingUp : form.signUp}
      </button>

      <div className={styles.orRow}>
        <div className={styles.orLine}></div>
        <span className={styles.orText}>{dialog.or}</span>
        <div className={styles.orLine}></div>
      </div>

      <button
        type="button"
        onClick={onSwitchToSignIn}
        className={styles.switchButton}
      >
        {dialog.titleSignIn}
      </button>
    </form>
  );
}
