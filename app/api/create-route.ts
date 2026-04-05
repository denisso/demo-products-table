import { NextResponse, NextRequest } from 'next/server';
import { refreshAccessToken } from './refresh-access-token';
import { accessTokenStore } from './server-vars';

type Fetcher = (accessToken: string) => Promise<Response>;

export const createRoute = (fetcher: Fetcher) => {
  return async function (request: NextRequest) {
    // Получаем refreshToken из httpOnly cookie
    const refreshToken = request.cookies.get('refreshToken')?.value;
    // мало вероятно так как proxy перенаправит на логин
    // если нет установленных cookie refreshToken или auth
    if (!refreshToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Пытаемся получить актуальный accessToken из хранилища
    let accessToken = accessTokenStore.get(refreshToken);

    // Получаем response с текущим accessToken
    let response = await fetcher(accessToken!);

    // Если получили 401, пробуем обновить токены
    if (response.status === 401 && accessToken) {
      const newAccessToken = await refreshAccessToken(refreshToken);
      if (newAccessToken) {
        accessToken = newAccessToken;
        response = await fetcher(accessToken);
      }
    }

    // Если всё ещё не ок (или refresh не удался) — возвращаем ошибку
    if (!response.ok) {
      // Удаляем испорченную куку при невалидном refresh
      if (response.status === 401) {
        const response = NextResponse.json(
          { error: 'Session expired' },
          { status: 401 },
        );
        response.cookies.set('refreshToken', '', { maxAge: 0, path: '/' });
        response.cookies.set('auth', '', { maxAge: 0, path: '/' });
        accessTokenStore.delete(refreshToken);
        return NextResponse.redirect(new URL('/login', request.url));
      }
      return NextResponse.json(
        { error: 'Failed to fetch products' },
        { status: response.status },
      );
    }

    // Успех — возвращаем данные клиенту
    const productsData = await response.json();
    return NextResponse.json(productsData);
  };
};
