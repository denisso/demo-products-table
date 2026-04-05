import {
  FieldValues,
  Path,
  UseFormRegister,
  FieldError,
} from 'react-hook-form';
import React from 'react';
import { Box } from '../../display';
import { Color } from '@/shared/types/color';

interface FormFieldProps<TFormData extends FieldValues> {
  label: string;
  name: Path<TFormData>;
  register: UseFormRegister<TFormData>;
  error?: FieldError;
  required?: boolean | string;
  render: (fieldProps: {
    ref: (instance: HTMLInputElement | null) => void;
    name: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
    id: string;
    color: Color;
  }) => React.ReactElement;
}

export function FormField<TFormData extends FieldValues>({
  label,
  name,
  register,
  error,
  required = false,
  render,
}: FormFieldProps<TFormData>) {
  const uniqueId = React.useId();
  const id = `${String(name)}-${uniqueId}`;
  const validationRules = required
    ? {
        required:
          typeof required === 'string' ? required : `${label} обязателен`,
      }
    : {};

  const { ref, onChange, onBlur } = register(name, validationRules);
  const color = error ? 'error' : ('' as Color);
  return (
    <Box className='gap-2'>
      <label htmlFor={id}>{label}</label>
      {render({ ref, name, onChange, onBlur, id, color })}
      <div className='h-4'>
        {error && (
          <p className='label text-error text-[.75rem]'>{error.message}</p>
        )}
      </div>
    </Box>
  );
}
