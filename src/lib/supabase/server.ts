
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import type { CookieOptions } from '@supabase/supabase-js'

export const createClient = () => {
  const cookieStore = cookies()

  return createServerComponentClient({
    cookies: () => cookieStore,
  })
}
