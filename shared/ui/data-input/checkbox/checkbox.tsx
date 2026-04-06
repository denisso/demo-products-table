'use client';
import clsx from 'clsx';
import { type Color } from '../../../types/color';

// классы которые будут сгенерированы
const colorMap: Record<Color, string> = {
  primary: 'checked-primary checked:bg-primary',
  error: 'checked-error checked:bg-error',
  neutral: 'checked-neutral checked:bg-neutral',
};

type Props = {
  color?: Color;
} & React.ComponentProps<'input'>;

export function Checkbox({ className, color, ...rest }: Props) {
  const colorClass = color ? colorMap[color] : colorMap['neutral'];

  return (
    <input
      type='checkbox'
      className={clsx(
        'checkbox [&::before]:hidden bg-transparent',
        colorClass,
        className,
      )}
      {...rest}
    />
  );
}
