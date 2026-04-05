import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refreshToken')?.value;

  if (!refreshToken) {
    return NextResponse.json(
      { error: 'Refresh token not found' },
      { status: 401 },
    );
  }

  const body: { refreshToken: string; expiresInMins?: number } = {
    refreshToken,
  };

  const { expiresInMins } = await request.json().catch(() => ({}));
  if (expiresInMins && typeof expiresInMins === 'number') {
    body.expiresInMins = expiresInMins;
  }

  try {
    const res = await fetch('https://dummyjson.com/auth/refresh', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { error: data.message || 'Failed to refresh token' },
        { status: res.status },
      );
    }

    const { accessToken, refreshToken: newRefreshToken } = data;

    const response = NextResponse.json({ accessToken });

    if (newRefreshToken) {
      response.cookies.set('refreshToken', newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/api/auth/refresh',
        maxAge: 60 * 60 * 24 * 7,
      });
    }

    return response;
  } catch (error) {
    console.error('Refresh error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
