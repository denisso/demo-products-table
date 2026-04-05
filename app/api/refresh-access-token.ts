import { accessTokenStore } from './server-vars';

export async function refreshAccessToken(
  refreshToken: string,
): Promise<string | null> {
  try {
    const res = await fetch('https://dummyjson.com/auth/refresh', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });

    const data = await res.json();

    if (!res.ok) return null;

    const { accessToken, refreshToken: newRefreshToken } = data;
    accessTokenStore.delete(refreshToken);
    accessTokenStore.set(newRefreshToken, accessToken);
    return accessToken;
  } catch {
    return null;
  }
}
