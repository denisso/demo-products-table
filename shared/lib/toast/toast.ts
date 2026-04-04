import { createStore, useStore as useZustandStore } from 'zustand';
import { type ToastColor } from '@/shared/types/color';
import { APP_CONFIG } from '@/shared/config';

export type ToastProps = {
  id: string;
  message: string;
  color: ToastColor;
  duration?: number;
};

type ToastStore = {
  toasts: ToastProps[];
  addToast: (toast: Omit<ToastProps, 'id'>) => void;
  removeToast: (id: string) => void;
};

const toastStore = createStore<ToastStore>((set) => ({
  toasts: [],
  addToast: (toast) => {
    const id = crypto.randomUUID();
    const newToast = { ...toast, id };
    set((state) => ({
      toasts: [
        ...state.toasts.slice(-(APP_CONFIG.MAX_TOASTS_ON_SCREEN - 1)),
        newToast,
      ],
    }));
    if (toast.duration !== 0) {
      setTimeout(() => {
        set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
      }, toast.duration ?? APP_CONFIG.TOAST_DEFAULT_DURATION);
    }
  },
  removeToast: (id) =>
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}));

export const useToastStore = <T>(selector: (state: ToastStore) => T) =>
  useZustandStore(toastStore, selector);

export const addToast = (toast: Omit<ToastProps, 'id'>) => {
  toastStore.getState().addToast(toast);
};

export const removeToast = (id: string) => {
  toastStore.getState().removeToast(id);
};
