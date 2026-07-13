'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

// ----- Helpers -----

/**
 * Sanitize Supabase error messages to prevent leaking internal details.
 * Maps known error codes/messages to user-friendly strings.
 */
function sanitizeAuthError(error: { message: string; status?: number }): string {
  const msg = error.message.toLowerCase()

  if (msg.includes('invalid login credentials')) {
    return 'Invalid email or password. Please try again.'
  }
  if (msg.includes('email not confirmed')) {
    return 'Please confirm your email address before logging in. Check your inbox.'
  }
  if (msg.includes('user already registered')) {
    return 'An account with this email already exists. Try logging in instead.'
  }
  if (msg.includes('signup is not allowed') || msg.includes('signups not allowed')) {
    return 'Signups are currently disabled. Please contact support.'
  }
  if (msg.includes('rate limit') || msg.includes('too many requests')) {
    return 'Too many attempts. Please wait a moment and try again.'
  }
  if (msg.includes('password') && msg.includes('at least')) {
    return error.message // Password policy messages are safe to show
  }

  // Generic fallback — never expose raw Supabase errors
  return 'Something went wrong. Please try again.'
}

/**
 * Strip HTML tags from user input to prevent stored XSS.
 * Used for fields like full_name that are stored in user_metadata.
 */
function sanitizeText(input: string): string {
  return input.replace(/<[^>]*>/g, '').trim()
}

/**
 * Basic email format validation.
 * Prevents obviously malformed emails from hitting the Supabase API.
 */
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

/**
 * Get the origin URL for redirects.
 * Uses x-forwarded-host in production (behind load balancers) and falls back to host header.
 */
async function getOrigin(): Promise<string> {
  const headersList = await headers()
  const forwardedHost = headersList.get('x-forwarded-host')
  const host = headersList.get('host')
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https'
  
  if (forwardedHost) {
    return `${protocol}://${forwardedHost}`
  }
  return `${protocol}://${host}`
}

// ----- Server Actions -----

export async function login(formData: FormData): Promise<{ error?: string }> {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  // Server-side validation
  if (!email || !password) {
    return { error: 'Email and password are required.' }
  }

  if (!isValidEmail(email.trim())) {
    return { error: 'Please enter a valid email address.' }
  }

  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email: email.trim().toLowerCase(),
    password,
  })

  if (error) {
    return { error: sanitizeAuthError(error) }
  }

  redirect('/dashboard')
}

export async function signup(formData: FormData): Promise<{ error?: string; success?: boolean }> {
  const fullName = formData.get('fullName') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  // Server-side validation
  if (!fullName || !email || !password) {
    return { error: 'All fields are required.' }
  }

  if (!isValidEmail(email.trim())) {
    return { error: 'Please enter a valid email address.' }
  }

  if (password.length < 6) {
    return { error: 'Password must be at least 6 characters.' }
  }

  // Sanitize fullName to strip HTML tags (prevents stored XSS in user_metadata)
  const cleanName = sanitizeText(fullName)
  if (!cleanName || cleanName.length > 100) {
    return { error: 'Please enter a valid name (max 100 characters).' }
  }

  const supabase = await createClient()

  const { data, error } = await supabase.auth.signUp({
    email: email.trim().toLowerCase(),
    password,
    options: {
      data: {
        full_name: cleanName,
        display_name: cleanName,
      },
    },
  })

  if (error) {
    return { error: sanitizeAuthError(error) }
  }

  // If email confirmation is enabled, Supabase returns a user but no session.
  // We check for this to show the "check your email" UI.
  if (data.user && !data.session) {
    return { success: true }
  }

  // If email confirmation is disabled, user is auto-confirmed and has a session.
  redirect('/dashboard')
}

export async function forgotPassword(formData: FormData): Promise<{ error?: string; success?: boolean }> {
  const email = formData.get('email') as string

  if (!email) {
    return { error: 'Email is required.' }
  }

  if (!isValidEmail(email.trim())) {
    return { error: 'Please enter a valid email address.' }
  }

  const supabase = await createClient()
  const origin = await getOrigin()

  const { error } = await supabase.auth.resetPasswordForEmail(
    email.trim().toLowerCase(),
    {
      redirectTo: `${origin}/auth/callback?next=/auth/update-password`,
    }
  )

  if (error) {
    return { error: sanitizeAuthError(error) }
  }

  // Always return success even if email doesn't exist (prevents email enumeration)
  return { success: true }
}

export async function updatePassword(formData: FormData): Promise<{ error?: string }> {
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword') as string

  if (!password || !confirmPassword) {
    return { error: 'Both password fields are required.' }
  }

  if (password !== confirmPassword) {
    return { error: 'Passwords do not match.' }
  }

  if (password.length < 6) {
    return { error: 'Password must be at least 6 characters.' }
  }

  const supabase = await createClient()

  // Verify the user has a valid recovery session
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { error: 'Your reset link has expired. Please request a new one.' }
  }

  const { error } = await supabase.auth.updateUser({
    password,
  })

  if (error) {
    return { error: sanitizeAuthError(error) }
  }

  redirect('/dashboard')
}
