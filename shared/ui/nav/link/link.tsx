'use client';
import { type Color } from '../../../types/color';
import clsx from 'clsx';
import _Link from 'next/link';
import './link.css';

// классы которые будут сгенерированы
const colorMap: Record<Color, string> = {
  primary: 'link-primary',
  error: 'link-error',
  neutral: 'link-neutral',
};

type Props = {
  color?: Color;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export const Link = ({ children, color, className, href, onClick }: Props) => {
  const _href = href ? href : '';
  const _onClick =
    !onClick && !href ? (e: React.MouseEvent) => e.preventDefault() : onClick;
  const colorClass = color ? colorMap[color] : colorMap['neutral'];
  return (
    <_Link
      className={clsx('link', colorClass, className)}
      href={_href}
      onClick={_onClick}
    >
      {children}
    </_Link>
  );
};
