'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginFormData, loginSchema } from './schemas';
import { login } from '@/lib/api';
import { useTranslation } from '../../hooks/useTranslation';

interface SignInFormProps {
  onSuccess: () => void;
}

export default function SignInForm({ onSuccess }: SignInFormProps) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });
  const form = useTranslation('auth.form');
  const errorsT = useTranslation('auth.errors');

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input type="email" placeholder={form.email} {...register('email')} />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <div>
        <input
          type="password"
          placeholder={form.password}
          {...register('password')}
        />
        {errors.password && <p>{errors.password.message}</p>}
      </div>

      {errors.root && <p>{errors.root.message}</p>}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? form.signingIn : form.signIn}
      </button>
    </form>
  );
}
