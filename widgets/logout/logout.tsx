'use client';
import { Button } from '@/shared/ui/data-input';
import { useRouter } from 'next/navigation';
import { addToast } from '@/shared/lib/toast';

const fetchLogout = () => {
  return fetch('/api/auth/logout', { method: 'POST' });
};

export const Logout = () => {
  const router = useRouter();
  const onClick = async () => {
    const response = await fetchLogout();
    if (!response.ok) {
      addToast({
        message: 'Ошибка разлогинивания попробуйте позже',
        color: 'error',
      });
      return;
    }
    router.push('/login');
  };
  return <Button onClick={onClick}>Logout</Button>;
};
