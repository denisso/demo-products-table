import clsx from 'clsx';

export const FormFields = ({
  children,
  className,
  ...rest
}: React.ComponentProps<'div'>) => {
  return (
    <div className={clsx('flex flex-col gap-2', className)} {...rest}>
      {children}
    </div>
  );
};
