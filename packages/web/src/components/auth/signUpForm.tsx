import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterFormData, registerSchema } from './schemas';
import { useForm } from 'react-hook-form';
import { registerUser } from '@/lib/api';
import { useTranslation } from '../../hooks/useTranslation';

interface SignUpFormProps {
  onSuccess: () => void;
}

export default function SignUpForm({ onSuccess }: SignUpFormProps) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });
  const form = useTranslation('auth.form');
  const errorsT = useTranslation('auth.errors');

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input placeholder={form.firstName} {...register('firstName')} />
        {errors.firstName && <p>{errors.firstName.message}</p>}
      </div>

      <div>
        <input placeholder={form.lastName} {...register('lastName')} />
        {errors.lastName && <p>{errors.lastName.message}</p>}
      </div>

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
        {isSubmitting ? form.signingUp : form.signUp}
      </button>
    </form>
  );
}
