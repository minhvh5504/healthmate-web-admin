import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const supportedLocales = ['en', 'vi'];
const defaultLocale = 'vi';

function getLocale(request: NextRequest) {
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
  if (cookieLocale && supportedLocales.includes(cookieLocale)) {
    return cookieLocale;
  }

  const acceptLanguage = request.headers.get('Accept-Language');
  if (acceptLanguage) {
    const preferredLocale = acceptLanguage
      .split(',')
      .map(lang => lang.split(';')[0].trim())
      .find(lang => supportedLocales.includes(lang.substring(0, 2)));

    if (preferredLocale) {
      return preferredLocale.substring(0, 2);
    }
  }

  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // Skip prefetch and data requests
  if (request.headers.has('x-middleware-prefetch') || request.headers.has('x-nextjs-data')) {
    return NextResponse.next();
  }

  // CRITICAL: Skip ALL /api routes to prevent interfering with NextAuth
  if (pathname.startsWith('/_next') || pathname.startsWith('/api') || pathname.includes('.')) {
    return NextResponse.next();
  }

  const pathnameHasLocale = supportedLocales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (!pathnameHasLocale) {
    const locale = getLocale(request);
    
    // Prevent redirect loop: only redirect if we're actually changing the path
    const newPathname = pathname === '/' ? `/${locale}` : `/${locale}${pathname}`;
    
    // Don't redirect if we're already at the target path
    if (pathname === newPathname) {
      return NextResponse.next();
    }
    
    const url = request.nextUrl.clone();
    url.pathname = newPathname;
    url.search = search;

    // Use 307 (Temporary Redirect) instead of default 308 (Permanent Redirect)
    const response = NextResponse.redirect(url, 307);
    response.cookies.set('NEXT_LOCALE', locale, {
      path: '/',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 365, // 1 year
    });

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Explicitly exclude API routes and static files
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)).*)',
  ],
};
