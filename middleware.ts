import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify, SignJWT } from 'jose';

const SECRET = new TextEncoder().encode(process.env.JWT_ACCESS_SECRET!);
const REFRESH_SECRET = new TextEncoder().encode(process.env.JWT_REFRESH_SECRET!);

async function verifyToken(token: string, secret: Uint8Array) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch {
    return null;
  }
}

async function refreshAccessToken(refreshToken: string) {
  const payload = await verifyToken(refreshToken, REFRESH_SECRET);
  if (!payload) return null;

  return await new SignJWT({
    userId: payload.userId,
    email: payload.email,
    role: payload.role,
    sessionId: payload.sessionId,
  })
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setExpirationTime('1h')
    .sign(SECRET);
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Safely get cookies values
  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  let payload: any = null;

  if (accessToken) {
    payload = await verifyToken(accessToken, SECRET);
  }

  // Strict Condition: Sirf tab refresh karein jab accessToken expired ho AUR physically refreshToken exist karta ho
  if (!payload && refreshToken) {
    const newToken = await refreshAccessToken(refreshToken);
    if (newToken) {
      const refreshResponse = NextResponse.redirect(request.url); 
      refreshResponse.cookies.set('accessToken', newToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 3600,
      });
      return refreshResponse;
    }
  }

  // 1. Enroll route protection
  if (pathname.startsWith('/enroll/')) {
    if (!payload) {
      const courseSlug = pathname.split('/')[2] || '';
      const url = new URL('/register', request.url);
      url.searchParams.set('redirect', `/enroll/${courseSlug}`);
      url.searchParams.set('course', courseSlug);
      return NextResponse.redirect(url);
    }
  }

  // 2. Guest Routes (Login/Register)
  if (pathname.startsWith('/login') || pathname.startsWith('/register')) {
    if (payload) {
      const dashboard = payload.role === 'admin' ? '/admin/dashboard' : '/student/dashboard';
      return NextResponse.redirect(new URL(dashboard, request.url));
    }
    return NextResponse.next();
  }

  // 3. Protected Routes (Admin/Student)
  if (pathname.startsWith('/admin') || pathname.startsWith('/student')) {
    if (!payload) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    
    const role = payload.role;
    if (pathname.startsWith('/admin') && role !== 'admin') {
      return NextResponse.redirect(new URL('/student/dashboard?error=unauthorized', request.url));
    }
    if (pathname.startsWith('/student') && role !== 'student') {
      return NextResponse.redirect(new URL('/admin/dashboard?error=unauthorized', request.url));
    }
  }

  return NextResponse.next();
}

// Matcher ko robust rakhein taake assets block na hon
export const config = {
  matcher: [
    '/admin/:path*', 
    '/student/:path*', 
    '/login', 
    '/register', 
    '/enroll/:path*'
  ],
};
