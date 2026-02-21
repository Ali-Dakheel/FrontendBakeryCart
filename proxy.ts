import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n.config';

const handleI18nRouting = createIntlMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
});


export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const i18nResponse = handleI18nRouting(request);

  const locale = pathname.split('/')[1];
  const isValidLocale = locales.includes(locale as any);

  if (!isValidLocale && !pathname.startsWith('/_next') && !pathname.includes('.')) {
    return i18nResponse;
  }

  const pathnameWithoutLocale = isValidLocale ? pathname.slice(locale.length + 1) || '/' : pathname;

  const hasAuthToken = request.cookies.has('easybake_auth');
  const isAuthenticated = hasAuthToken;

  const protectedRoutes = ['/checkout', '/orders', '/account'];
  const isProtectedRoute = protectedRoutes.some(route =>
    pathnameWithoutLocale.startsWith(route)
  );

  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL(`/${locale}/login`, request.url);
    loginUrl.searchParams.set('redirect', pathnameWithoutLocale);
    return NextResponse.redirect(loginUrl);
  }

  const authRoutes = ['/login', '/register'];
  const isAuthRoute = authRoutes.includes(pathnameWithoutLocale);

  if (isAuthRoute && isAuthenticated) {
    const redirectParam = request.nextUrl.searchParams.get('redirect');
    const redirectUrl = redirectParam && redirectParam.startsWith('/')
      ? new URL(`/${locale}${redirectParam}`, request.url)
      : new URL(`/${locale}/`, request.url);

    return NextResponse.redirect(redirectUrl);
  }

  const response = i18nResponse.clone();

  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  if (pathname.startsWith('/api')) {
    response.headers.set('Access-Control-Allow-Credentials', 'true');
    response.headers.set('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  }

  const cartToken = request.cookies.get('cart_token');
  if (cartToken) {
    response.headers.set('X-Has-Cart', 'true');
  }

  // Add locale header for debugging
  if (isValidLocale) {
    response.headers.set('X-Locale', locale);
  }

  return response;
}


export const config = {
  matcher: [
    '/',
    '/(en|ar)/:path*',
    '/((?!_next|_vercel|.*\\..*).*)'
  ],
};
