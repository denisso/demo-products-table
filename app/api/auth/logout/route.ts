import { NextResponse } from 'next/server';

export async function POST() {
  const response = new NextResponse(null, { status: 200 });
  response.cookies.set('refreshToken', '', {
    httpOnly: true,
    maxAge: 0,
    path: '/api/auth/refresh',
  });
  response.cookies.set('auth', '', {
    httpOnly: true,
    maxAge: 0,
    path: '/',
  });
  return response;
}
