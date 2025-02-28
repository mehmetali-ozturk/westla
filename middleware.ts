import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const userCookie = req.cookies.get('userInfos')
  console.log(userCookie)

  const url = req.nextUrl.clone()

  if (url.pathname === '/login' || url.pathname === '/no-access') {
    return NextResponse.next()
  }

  if (!userCookie) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  const userInfo = JSON.parse(userCookie.value)

  if (url.pathname.startsWith('/admin') && !userInfo.isAdmin) {
    return NextResponse.redirect(new URL('/user', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*','/user/:path*','/user'],
};
