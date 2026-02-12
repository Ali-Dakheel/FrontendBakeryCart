import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n.config';

// Create the i18n middleware
const handleI18nRouting = createIntlMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
});

/**
 * Next.js 16 Proxy (formerly middleware)
 * Runs before each request is completed
 * Handles i18n, authentication, redirects, and security
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ============================================
  // 1. Handle Internationalization First
  // ============================================
  const i18nResponse = handleI18nRouting(request);

  // Get the locale from pathname (e.g., /en/products -> en)
  const locale = pathname.split('/')[1];
  const isValidLocale = locales.includes(locale as any);

  // If not a valid locale, let i18n middleware handle it
  if (!isValidLocale && !pathname.startsWith('/_next') && !pathname.includes('.')) {
    return i18nResponse;
  }

  // Remove locale from pathname for route checking
  const pathnameWithoutLocale = isValidLocale ? pathname.slice(locale.length + 1) || '/' : pathname;

  // Get authentication state from cookies
  const hasAuthToken = request.cookies.has('easy_bake_session');
  const isAuthenticated = hasAuthToken;

  // ============================================
  // 2. Protected Routes - Require Authentication
  // ============================================
  const protectedRoutes = ['/checkout', '/orders', '/account'];
  const isProtectedRoute = protectedRoutes.some(route =>
    pathnameWithoutLocale.startsWith(route)
  );

  if (isProtectedRoute && !isAuthenticated) {
    // Redirect to login and preserve intended destination
    const loginUrl = new URL(`/${locale}/login`, request.url);
    loginUrl.searchParams.set('redirect', pathnameWithoutLocale);
    return NextResponse.redirect(loginUrl);
  }

  // ============================================
  // 3. Auth Routes - Redirect if Already Logged In
  // ============================================
  const authRoutes = ['/login', '/register'];
  const isAuthRoute = authRoutes.includes(pathnameWithoutLocale);

  if (isAuthRoute && isAuthenticated) {
    // Check for redirect parameter
    const redirectParam = request.nextUrl.searchParams.get('redirect');
    const redirectUrl = redirectParam && redirectParam.startsWith('/')
      ? new URL(`/${locale}${redirectParam}`, request.url)
      : new URL(`/${locale}/`, request.url);

    return NextResponse.redirect(redirectUrl);
  }

  // ============================================
  // 4. Security Headers
  // ============================================
  const response = i18nResponse.clone();

  // Add security headers to all responses
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  // Add CORS headers for API routes (if needed)
  if (pathname.startsWith('/api')) {
    response.headers.set('Access-Control-Allow-Credentials', 'true');
    response.headers.set('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  }

  // ============================================
  // 5. Cart Persistence & Custom Headers
  // ============================================
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

/**
 * Matcher Configuration
 * Defines which routes the proxy should run on
 */
export const config = {
  matcher: [
    // Enable a redirect to a matching locale at the root
    '/',

    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    '/(en|ar)/:path*',

    // Enable redirects that add missing locales
    // (e.g. `/pathnames` -> `/en/pathnames`)
    '/((?!_next|_vercel|.*\\..*).*)'
  ],
};
