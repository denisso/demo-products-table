import {
  FieldValues,
  Path,
  UseFormRegister,
  FieldError,
} from 'react-hook-form';
import React from 'react';
import { Color } from '@/shared/types/color';

interface FormFieldProps<TFormData extends FieldValues> {
  label: string;
  name: Path<TFormData>;
  register: UseFormRegister<TFormData>;
  onChange?: (event: React.ChangeEvent<HTMLElement>) => void;
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

const requiredMessage = {
  required: 'Обязательное поле',
};

export function FormField<TFormData extends FieldValues>({
  label,
  name,
  register,
  onChange,
  error,
  required = false,
  render,
}: FormFieldProps<TFormData>) {
  const uniqueId = React.useId();
  const id = `${String(name)}-${uniqueId}`;
  const validationRules = required ? requiredMessage : {};

  const {
    ref,
    onChange: _onChangeReg,
    onBlur,
  } = register(name, validationRules);

  const _onChange = (event: React.ChangeEvent<HTMLElement>) => {
    _onChangeReg(event);
    if (typeof onChange == 'function') {
      onChange(event);
    }
  };

  const color = error ? 'error' : ('' as Color);
  return (
    <div className='flex flex-col gap-2'>
      <label className='font-medium' htmlFor={id}>
        {label}
      </label>
      <div>
        {render({ ref, name, onChange: _onChange, onBlur, id, color })}
        <div className='h-4'>
          {error && <p className='label text-error'>{error.message}</p>}
        </div>
      </div>
    </div>
  );
}
