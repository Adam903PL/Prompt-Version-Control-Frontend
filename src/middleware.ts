import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Define public routes that don't require authentication
  const publicRoutes = ['/', '/sign-in', '/sign-up', '/docs'];

  // Check if the current path is a public route
  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  // Check for session token
  // better-auth uses 'better-auth.session_token' or '__Secure-better-auth.session_token'
  const sessionToken =
    request.cookies.get('better-auth.session_token') ||
    request.cookies.get('__Secure-better-auth.session_token');

  const isAuthenticated = !!sessionToken;

  // 1. If user is authenticated
  if (isAuthenticated) {
    // Redirect to dashboard if trying to access sign-in or sign-up
    if (pathname === '/sign-in' || pathname === '/sign-up') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }
  // 2. If user is NOT authenticated
  else {
    // Redirect to sign-in if trying to access a protected route
    if (!isPublicRoute) {
      // Create the redirect URL
      const url = new URL('/sign-in', request.url);
      // Optional: Add callback URL to redirect back after login
      // url.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!api|_next/static|_next/image|favicon.ico|icon|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
