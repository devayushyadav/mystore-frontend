import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const publicPaths = [
  '/login',
  '/signup'
]
const protectedPaths = [
  '/',
  '/products',
  '/add-product',
  '/my-products',
  '/my-products/:path*',  // Change this line
];
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {

  const { pathname } = request.nextUrl;

  const token = request.cookies.get('token')

  if(token && publicPaths.includes(pathname)){
    const url = request.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url)
  }

  // Check if the requested path matches any protected paths
  const isProtectedPath = protectedPaths.some(path => {
    const regex = new RegExp(`^${path.replace(':path*', '(.+)?')}$`);
    return regex.test(pathname);
  });

  // Redirect logic for unauthenticated users trying to access protected paths
  if (!token && isProtectedPath) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  return NextResponse.next()


}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/login',
    '/signup',
    '/products',
    '/add-product',
    '/my-products/:path*', // This allows for dynamic segments
  ],
};