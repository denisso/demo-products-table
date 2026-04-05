import { NextRequest, NextResponse } from 'next/server';
import { accessTokenStore } from '../../server-vars';

export async function POST(request: NextRequest) {
  const { username, password } = await request.json();

  const res = await fetch('https://dummyjson.com/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password, expiresInMins: 30 }),
  });
  const data = await res.json();
  if (!res.ok) {
    return NextResponse.json({ error: data.message }, { status: res.status });
  }

  const { accessToken, refreshToken, ...user } = data;

  const response = NextResponse.json({ user });

  accessTokenStore.set(refreshToken, accessToken);

  response.cookies.set('auth', 'true', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 30 * 24 * 60 * 60,
  });

  response.cookies.set('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 30 * 24 * 60 * 60,
  });

  return response;
}
