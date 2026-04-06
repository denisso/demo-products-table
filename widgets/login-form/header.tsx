import { Icon } from '@/shared/ui/display/icon';

export const LoginFormHeader = () => {
  return (
    <div className='flex flex-col mb-6 gap-6 items-center'>
      <Icon filename='logo' width={'auto'} height={52} />
      <div className='flex flex-col items-center'>
        <div className='text-[2.5rem] font-medium'>Добро пожаловать!</div>
        <div className='text-[1.125rem] text-muted'>
          Пожалуйста авторизируйтесь
        </div>
      </div>
    </div>
  );
};
