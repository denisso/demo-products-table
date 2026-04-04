import { removeToast, type ToastProps } from '@/shared/lib/toast';
import { type ToastColor } from '@/shared/types/color';
import clsx from 'clsx';

// классы которые будут сгенерированы
const colorMap: Record<ToastColor, string> = {
  info: 'alert-info',
  success: 'alert-success',
  error: 'alert-error',
};

type Props = {
  toast: ToastProps;
};

export const Toast = ({ toast }: Props) => {
  const colorClass = toast.color ? colorMap[toast.color] : colorMap['info'];
  return (
    <div className={clsx('alert alert-', colorClass)}>
      <span>{toast.message}</span>

      <button
        className='btn btn-sm btn-ghost'
        onClick={() => removeToast(toast.id)}
      >
        ✕
      </button>
    </div>
  );
};
