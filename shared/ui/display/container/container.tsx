import clsx from 'clsx';
export const Container = ({
  children,
  className,
}: React.ComponentProps<'div'>) => {
  return (
    <div className='p-1.5 bg-white rounded-[40px] bg-linear-to-b from-[rgba(35,35,35,0.03)] to-transparent shadow-[0px_24px_32px_rgba(0,0,0,0.04)]'>
      <div className='bg-[linear-gradient(180deg,rgba(35,35,35,0.03)_0%,rgba(35,35,35,0)_50%)] rounded-[34px] p-12'>
        <div className={clsx('flex flex-col', className)}>{children}</div>
      </div>
    </div>
  );
};
