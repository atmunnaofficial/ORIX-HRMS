import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Ekhane session cookie ba token verify korar logic thakbe
  const path = request.nextUrl.pathname;

  // Example protection check (Token ba session na thakle login e pathabe)
  // const token = request.cookies.get("token")?.value;
  // if ((path.startsWith("/admin") || path.startsWith("/manager") || path.startsWith("/employee")) && !token) {
  //   return NextResponse.redirect(new URL("/auth/login", request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/manager/:path*', '/employee/:path*'],
};
