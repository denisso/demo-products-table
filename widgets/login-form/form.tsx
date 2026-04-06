'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import {
  FormField,
  FormFields,
  PasswordInput,
  LoginInput,
} from '@/shared/ui/data-input';
import { addToast } from '@/shared/lib/toast';
import { LoginFormHeader } from './header';
import { login } from '@/shared/api';
import { LoginFormFooter } from './footer';

interface LoginFormData {
  username: string;
  password: string;
}

const AUTH_WRONG = 'AUTH_WRONG';

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    getValues,
    setValue,
  } = useForm<LoginFormData>();

  const router = useRouter();

  React.useEffect(() => {
    setValue('username', '');
    setValue('password', '');
  }, [setValue]);

  const onSubmit = async () => {
    clearErrors();

    try {
      const [username, password] = getValues(['username', 'password']);

      const response = await login(username, password);

      if (!response.ok) {
        if (response.status == 400) {
          setError('username', { message: 'Неверный логин' });
          setError('password', { message: 'Неверный пароль' });
          setError('root', { message: AUTH_WRONG });
          return;
        }
        addToast({ message: 'Ошибка при входе', color: 'error' });
        return;
      }

      router.push('/');
    } catch {
      addToast({
        message: 'Сетевая ошибка. Попробуйте позже.',
        color: 'error',
      });
    }
  };
  const handleErrors = () => {
    if (errors.root?.message == AUTH_WRONG) {
      clearErrors();
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <LoginFormHeader />
      <FormFields>
        <FormField
          label='Логин'
          name='username'
          register={register}
          onChange={handleErrors}
          error={errors.username}
          required
          render={({ ref, ...fieldProps }) => (
            <LoginInput ref={ref} {...fieldProps} />
          )}
        />
        <FormField
          label='Пароль'
          name='password'
          register={register}
          onChange={handleErrors}
          error={errors.password}
          required
          render={({ ref, ...fieldProps }) => (
            <PasswordInput ref={ref} {...fieldProps} />
          )}
        />
      </FormFields>
      <LoginFormFooter />
    </form>
  );
}
