import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const isAuthenticated = request.cookies.get('auth')?.value === 'true';
  const refreshToken = request.cookies.get('refreshToken')?.value;
  const isLoginPage = request.nextUrl.pathname === '/login';

  if (!isAuthenticated || !refreshToken) {
    if (isLoginPage) {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isAuthenticated && isLoginPage) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|icons).*)'],
};
