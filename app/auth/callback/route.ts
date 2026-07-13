import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

/**
 * Allowlist of internal paths the callback is permitted to redirect to.
 * This prevents open-redirect attacks where an attacker injects an external URL
 * into the `next` query parameter (e.g. ?next=https://evil.com).
 */
const ALLOWED_REDIRECT_PATHS = [
  '/dashboard',
  '/auth/update-password',
]

function getSafeRedirectPath(next: string | null): string {
  if (!next) return '/dashboard'

  // Strip any protocol/host — only allow relative paths
  const path = next.startsWith('/') ? next : `/${next}`

  // Reject protocol-relative URLs (e.g. //evil.com)
  if (path.startsWith('//')) return '/dashboard'

  // Check against the allowlist
  if (ALLOWED_REDIRECT_PATHS.some(allowed => path.startsWith(allowed))) {
    return path
  }

  // Default to dashboard for any unrecognized path
  return '/dashboard'
}

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = getSafeRedirectPath(searchParams.get('next'))

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      const forwardedHost = request.headers.get('x-forwarded-host')
      const isLocalEnv = process.env.NODE_ENV === 'development'
      if (isLocalEnv) {
        return NextResponse.redirect(`${origin}${next}`)
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`)
      } else {
        return NextResponse.redirect(`${origin}${next}`)
      }
    }
  }

  // return the user to login with an error param
  return NextResponse.redirect(`${origin}/auth/login?error=Could+not+authenticate`)
}
