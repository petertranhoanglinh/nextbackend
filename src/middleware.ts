
import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/jwt';

export async function middleware(req: NextRequest) {
  const excludedRoutes = ['/api/auth', '/api/register'];
  const currentUrl = req.nextUrl.pathname;

  if (excludedRoutes.includes(currentUrl)) {
    return NextResponse.next();
  }

  const token = req.headers.get('authorization')?.split(' ')[1];
  console.log(token)
  if (!token) return new NextResponse('Token required', { status: 401 });

  const user = await verifyToken(token); // ✨ phải await nè
  if (!user) return new NextResponse('Invalid token', { status: 401 });

  return NextResponse.next();
}
