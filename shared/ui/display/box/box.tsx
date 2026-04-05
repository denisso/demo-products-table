import clsx from 'clsx';

export const Box = ({
  children,
  className,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={clsx('flex flex-col', className)} {...rest}>
      {children}
    </div>
  );
};
