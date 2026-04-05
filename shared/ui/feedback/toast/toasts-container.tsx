'use client';
import { useToastStore } from '@/shared/lib/toast';
import { Toast } from './toast';

export const ToastsContainer = () => {
  const toasts = useToastStore((state) => state.toasts);
  return (
    <div className='fixed bottom-4 right-4 z-50 flex flex-col gap-2'>
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} />
      ))}
    </div>
  );
};
