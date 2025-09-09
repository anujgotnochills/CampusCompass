
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // if user is signed in and the current path is / or other public pages, redirect the user to /dashboard
  if (user && ['/', '/login', '/signup'].includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  // if user is not signed in and the current path is not a public page, redirect the user to /login
  if (!user && !['/', '/login', '/signup'].includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/login', req.url))
  }
  
  await supabase.auth.getSession()


  return res
}

export const config = {
  matcher: ['/', '/dashboard', '/items/:path*', '/matches', '/profile', '/report', '/login', '/signup'],
}
