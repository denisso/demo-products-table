import { Box } from '../../display';
import clsx from 'clsx';

export const FormFields = ({
  children,
  className,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <Box className={clsx('gap-2', className)} {...rest}>
      {children}
    </Box>
  );
};
