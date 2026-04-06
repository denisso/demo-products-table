import React from 'react';
import { Checkbox } from '@/shared/ui/data-input';
import { Button } from '@/shared/ui/data-input';
import { Link } from '@/shared/ui/nav';
import { useUserStore } from '@/entities/user';

export const LoginFormFooter = () => {
  const isAauthPreserve = useUserStore((state) => state.isAauthPreserve);
  const setAuthPreserve = useUserStore((state) => state.setAuthPreserve);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuthPreserve(event.target.checked);
  };
  
  return (
    <div className='flex flex-col gap-4'>
      <div className='mt-2'>
        <div className='flex items-center'>
          <Checkbox
            color='primary'
            onChange={onChange}
            checked={isAauthPreserve}
          />
          <span className='ml-2 text-muted'>Запомнить данные</span>
        </div>
        <Button type='submit' color='primary' className='mt-6'>
          Войти
        </Button>
      </div>
      <div className='flex items-center'>
        <div className='grow h-px border-b border-neutral' />
        <span className='text-muted px-4'>или</span>
        <div className='grow h-px border-b border-neutral' />
      </div>
      <div className='text-center'>
        <span className='text-muted'>Нет аккаунта?</span>
        <Link color='primary' className='ml-2 font-medium'>
          Создать
        </Link>
      </div>
    </div>
  );
};
