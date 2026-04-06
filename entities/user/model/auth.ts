import { create } from 'zustand';
import { User } from '../types';
import { login } from '../api';

interface UserStore {
  login: (username: string, password: string) => Promise<User>;
  logout: () => void;
  resetError: () => void;
  setAuthPreserve: (isAauthPreserve: boolean) => void;
  isAauthPreserve: boolean;
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

// для предотвращения параллельных запросов
let _pendingLoginPromise: Promise<User> | null = null;

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  isLoading: false,
  error: null,
  isAauthPreserve: false,
  setAuthPreserve: (isAauthPreserve) => {
    set({ isAauthPreserve });
    localStorage.setItem('isAauthPreserve', String(isAauthPreserve));
  },
  login: async (username: string, password: string) => {
    // Проверяем, нет ли уже активного запроса
    if (_pendingLoginPromise) {
      // Если запрос уже идёт – возвращаем тот же Promise
      return _pendingLoginPromise;
    }

    //  Создаём новый Promise и сохраняем его в store
    const promise = (async () => {
      set({ isLoading: true, error: null });
      try {
        const user = await login(username, password);
        set({ user, isLoading: false, error: null });
        return user;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Unknown error';
        set({ error: errorMessage, isLoading: false });
        throw err;
      } finally {
        // Обязательно сбрасываем pending Promise после завершения (успех/ошибка)
        _pendingLoginPromise = null;
      }
    })();
    _pendingLoginPromise = promise;

    return promise;
  },

  logout: () => {
    set({
      user: null,
      error: null,
      isLoading: false,
    });
    _pendingLoginPromise = null;
  },

  resetError: () => set({ error: null }),
}));

if (typeof window !== 'undefined') {
  const isAauthPreserve = localStorage.getItem('isAauthPreserve') == 'true';
  if (isAauthPreserve) {
    useUserStore.setState({ isAauthPreserve });
  }

  window.addEventListener('beforeunload', () => {
    if (!useUserStore.getState().isAauthPreserve) {
      navigator.sendBeacon('/api/auth/logout');
    }
  });
}
