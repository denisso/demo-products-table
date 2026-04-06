import { User } from '../types';

export const login = async (
  username: string,
  password: string,
): Promise<User> => {
  return fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  }).then(async (res) => {
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText || 'Login failed');
    }
    return res.json() as Promise<User>;
  });
};
