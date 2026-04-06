export const login = (username: string, password: string) => {
  return fetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });
};
