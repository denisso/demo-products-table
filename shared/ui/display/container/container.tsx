import clsx from 'clsx';
export const Container = ({
  children,
  className,
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className='p-1.5 bg-white rounded-[40px] bg-linear-to-b from-[rgba(35,35,35,0.03)] to-transparent  shadow-[0px_24px_32px_rgba(0,0,0,0.04)]'>
      <div className='drop-shadow-[0px_4px_4px_rgba(0,0,0,0.25)] rounded-[34px] p-10'>
        <div className={clsx('flex flex-col', className)}>{children}</div>
      </div>
    </div>
  );
};
