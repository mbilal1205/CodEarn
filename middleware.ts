// middleware.ts
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // api, _next, static files, aur files with extension ko chhod kar sab match karo
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};