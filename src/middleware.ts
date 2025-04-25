
import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/jwt';

export function middleware(req  :  NextRequest) {
  const excludedRoutes = ['/api/login', '/api/register'];
  const currentUrl = req.nextUrl.pathname;

  if (excludedRoutes.includes(currentUrl)) {
    return NextResponse.next();
  }

  const token = req.headers.get('authorization')?.split(' ')[1];
  if (!token) return new NextResponse('Token required', { status: 401 });

  const user = verifyToken(token);
  if (!user) return new NextResponse('Invalid token', { status: 401 });
  
  return NextResponse.next();
}
