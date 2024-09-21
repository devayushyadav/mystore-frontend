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
  '/my-products'
]
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {

  const { pathname } = request.nextUrl;

  const token = request.cookies.get('token')

  if(token && publicPaths.includes(pathname)){
    const url = request.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url)
  }

  if(!token && protectedPaths.includes(pathname)){
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url)
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
    '/my-products'
  ],
};