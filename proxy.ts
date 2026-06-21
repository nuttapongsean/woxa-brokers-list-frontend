import createMiddleware from 'next-intl/middleware';
import { type NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';
import { publicPaths } from './lib/config';
import { verifySession, SESSION_COOKIE_NAME } from './lib/session';

const intlMiddleware = createMiddleware(routing);

function isPublicPath(pathname: string): boolean {
  const withoutLocale = pathname.replace(/^\/(en|th)/, '') || '/';
  if (publicPaths.has(withoutLocale)) return true;
  // broker detail pages are public; /brokers/submit is protected
  if (withoutLocale.startsWith('/brokers/') && withoutLocale !== '/brokers/submit') return true;
  return false;
}

function getLocale(pathname: string): string {
  const segment = pathname.split('/')[1] ?? '';
  return (routing.locales as readonly string[]).includes(segment)
    ? segment
    : routing.defaultLocale;
}

const guestOnlyPaths = new Set(['/login', '/register']);

function isGuestOnly(pathname: string): boolean {
  const withoutLocale = pathname.replace(/^\/(en|th)/, '') || '/';
  return guestOnlyPaths.has(withoutLocale);
}

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionToken = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const hasSession = sessionToken ? await verifySession(sessionToken) : false;

  // Logged-in users cannot access login / register — send them home
  if (hasSession && isGuestOnly(pathname)) {
    const locale = getLocale(pathname);
    return NextResponse.redirect(new URL(`/${locale}/brokers`, request.url));
  }

  // Unauthenticated users cannot access protected paths
  if (!hasSession && !isPublicPath(pathname)) {
    const locale = getLocale(pathname);
    return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
    '/',
    '/(en|th)/:path*',
  ],
};
