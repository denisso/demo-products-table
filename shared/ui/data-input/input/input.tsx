'use client';
import React, { forwardRef, InputHTMLAttributes } from 'react';
import clsx from 'clsx';
import { type Color } from '../../../types/color';
import Image from 'next/image';

// классы которые будут сгенерированы
const colorMap: Record<Color, string> = {
  primary: 'border-primary outline-primary',
  error: 'border-error outline-error',
  neutral: 'border-neutral outline-neutral',
};

type Props = {
  type: 'search' | 'text' | 'password';
  placeholder?: string;
  color?: Color;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
};

const Input = forwardRef<
  HTMLInputElement,
  Props & InputHTMLAttributes<HTMLInputElement>
>(
  (
    {
      leftIcon,
      rightIcon,
      color = 'neutral',
      type = 'text',
      placeholder = '',
      className,
      autoComplete,
      ...rest
    },
    ref,
  ) => {
    const colorClass = colorMap[color] || colorMap.neutral;
    return (
      <div className={clsx('input w-full', colorClass)}>
        {leftIcon}
        <input
          type={type}
          className={clsx('grow ', className)}
          placeholder={placeholder}
          ref={ref}
          autoComplete={autoComplete ? "on" : "off"}
          {...rest}
        />
        {rightIcon}
      </div>
    );
  },
);

Input.displayName = 'Input';

type InputRef = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'ref' | 'type'
>;

export const SearchInput = forwardRef<
  HTMLInputElement,
  Pick<Props, 'color'> & InputRef
>(({ color, placeholder, ...rest }, ref) => (
  <Input
    leftIcon={
      <Image src='/icons/search.svg' alt='Поиск' width={24} height={24} />
    }
    type={'search'}
    placeholder={placeholder || 'Найти'}
    color={color}
    ref={ref}
    {...rest}
  />
));

SearchInput.displayName = 'SearchInput';

export const LoginInput = forwardRef<
  HTMLInputElement,
  Pick<Props, 'color'> &
    InputRef & {
      setValue?: React.Dispatch<React.SetStateAction<string>>;
    }
>(({ setValue, color, placeholder, ...rest }, ref) => {
  return (
    <Input
      leftIcon={
        <Image src='/icons/login.svg' alt='Логин' width={24} height={24} />
      }
      type='text'
      placeholder={placeholder || 'Логин'}
      color={color}
      ref={ref}
      {...rest}
      rightIcon={
        <Image
          src='/icons/clear.svg'
          alt='Пароль'
          width={24}
          height={24}
          className='cursor-pointer'
          onClick={() => {
            if (typeof setValue == 'function') {
              setValue('');
            }
          }}
        />
      }
    />
  );
});

LoginInput.displayName = 'LoginInput';

export const PasswordInput = forwardRef<
  HTMLInputElement,
  Pick<Props, 'color'> & InputRef
>(({ color, placeholder, ...rest }, ref) => {
  const [hide, setHide] = React.useState(true);
  return (
    <Input
      leftIcon={
        <Image src='/icons/password.svg' alt='Пароль' width={24} height={24} />
      }
      type={hide ? 'password' : 'text'}
      placeholder={placeholder || 'Пароль'}
      color={color}
      ref={ref}
      {...rest}
      rightIcon={
        <Image
          src='/icons/eye-off.svg'
          alt='Пароль'
          width={24}
          height={24}
          className='cursor-pointer'
          onClick={() => setHide((prev) => !prev)}
        />
      }
    />
  );
});

PasswordInput.displayName = 'PasswordInput';

export const TextInput = forwardRef<
  HTMLInputElement,
  Pick<Props, 'color' | 'placeholder'> & InputRef
>(({ color, placeholder, ...rest }, ref) => (
  <Input
    placeholder={placeholder}
    type='text'
    color={color}
    ref={ref}
    {...rest}
  />
));

TextInput.displayName = 'TextInput';
