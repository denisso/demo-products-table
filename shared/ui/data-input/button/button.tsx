'use client';
import clsx from 'clsx';
import { type Color } from '../../../types/color';

// классы которые будут сгенерированы
const colorMap: Record<Color, string> = {
  primary: 'btn-primary',
  error: 'btn-error',
  neutral: 'btn-neutral',
};

type Props = {
  color?: Color;
} & React.ComponentProps<'button'>;

export const Button = ({
  children,
  onClick,
  color,
  className,
  ...rest
}: Props) => {
  const colorClass = color ? colorMap[color] : colorMap['neutral'];
  return (
    <button
      onClick={onClick}
      className={clsx('btn w-full', colorClass, className)}
      {...rest}
    >
      {children}
    </button>
  );
};
