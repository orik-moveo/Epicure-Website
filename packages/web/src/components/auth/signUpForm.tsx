'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterFormData, registerSchema } from './schemas';
import { useForm } from 'react-hook-form';
import { useTranslation } from '../../hooks/useTranslation';
import styles from './authDialog.module.scss';
import FormInput from './components/formInput';
import OrDivider from './components/OrDivider';
import SwitchButton from './components/SwitchButton';
import SubmitButton from './components/SubmitButton';
import FormHeader from './components/FormHeader';
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
  const formT = useTranslation('auth.form');
  const dialogT = useTranslation('auth.dialog');
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
      <FormHeader
        title={dialogT.titleSignUp}
        subtitle={dialogT.signUpSubtitle}
      />

      <FormInput
        name="firstName"
        label={formT.firstName}
        register={register}
        errors={errors}
        value={firstName}
      />

      <FormInput
        name="lastName"
        label={formT.lastName}
        register={register}
        errors={errors}
        value={lastName}
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
        loadingText={formT.signingUp}
        submitText={formT.signUp}
      />

      <OrDivider text={dialogT.or} />

      <SwitchButton text={dialogT.titleSignIn} onClick={onSwitchToSignIn} />
    </form>
  );
}
