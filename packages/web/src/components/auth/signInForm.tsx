'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginFormData, loginSchema } from './schemas';
import { useTranslation } from '../../hooks/useTranslation';
import styles from './authDialog.module.scss';
import FormInput from './components/formInput';
import OrDivider from './components/OrDivider';
import SwitchButton from './components/SwitchButton';
import SubmitButton from './components/SubmitButton';
import FormHeader from './components/FormHeader';
import { useAuth } from '@/hooks/useAuth';

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
  const formT = useTranslation('auth.form');
  const dialogT = useTranslation('auth.dialog');
  const errorsT = useTranslation('auth.errors');
  const { login } = useAuth();

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
      <FormHeader
        title={dialogT.titleSignIn}
        subtitle={dialogT.signInSubtitle}
      />

      <FormInput
        name="email"
        label={formT.email}
        type="email"
        register={register}
        errors={errors}
        value={email}
      />

      <FormInput
        name="password"
        label={formT.password}
        type="password"
        register={register}
        errors={errors}
        value={password}
      />

      {errors.root && <p className={styles.rootError}>{errors.root.message}</p>}

      <SubmitButton
        isSubmitting={isSubmitting}
        isValid={isValid}
        loadingText={formT.signingIn}
        submitText={formT.login}
      />

      <button type="button" className={styles.forgetPassword}>
        {dialogT.forgetPassword}
      </button>

      <OrDivider text={dialogT.or} />

      <SwitchButton text={dialogT.titleSignUp} onClick={onSwitchToSignUp} />
    </form>
  );
}
