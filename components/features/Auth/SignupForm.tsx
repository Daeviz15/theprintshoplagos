'use client';

import { useState, useEffect, useTransition } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { signup } from '@/app/auth/actions';
import GlobalLoader from '@/components/ui/GlobalLoader';

export default function SignupForm() {
  const searchParams = useSearchParams();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSignupSuccess, setIsSignupSuccess] = useState(false);

  useEffect(() => {
    const errorParam = searchParams.get('error');
    if (errorParam) {
      setErrorMsg(decodeURIComponent(errorParam));
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Client-side validation
    if (!fullName.trim() || !email.trim() || !password) {
      setErrorMsg('All fields are required.');
      return;
    }

    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters.');
      return;
    }

    startTransition(async () => {
      const formData = new FormData();
      formData.append('fullName', fullName);
      formData.append('email', email);
      formData.append('password', password);

      const result = await signup(formData);
      if (result?.error) {
        setErrorMsg(result.error);
      } else if (result?.success) {
        setIsSignupSuccess(true);
      }
    });
  };

  const handleGoogleSignup = async () => {
    try {
      setIsGoogleLoading(true);
      setErrorMsg(null);
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
        },
      });
      if (error) throw error;
    } catch (error: any) {
      setErrorMsg(error.message || 'An error occurred during sign up.');
      setIsGoogleLoading(false);
    }
  };

  const isLoading = isPending || isGoogleLoading;

  // Success state — "Check your email" confirmation
  if (isSignupSuccess) {
    return (
      <div className="flex flex-col">
        <h1 className="text-[2.5rem] font-heading font-extrabold tracking-tight leading-tight text-brand-black">
          Check Your Email
        </h1>
        <p className="mt-2 text-sm text-brand-muted">
          We&apos;re almost there.
        </p>

        <div className="mt-10 p-6 rounded-lg bg-brand-black/[0.02] border border-brand-border flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 rounded-full bg-brand-accent/10 flex items-center justify-center mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 6L9 17L4 12" stroke="#F46A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-brand-black mb-2">Confirmation link sent</h3>
          <p className="text-sm text-brand-muted">
            We&apos;ve sent a confirmation link to <br/> <span className="font-medium text-brand-black">{email}</span>
          </p>
          <p className="text-xs text-brand-muted mt-3">
            Click the link in the email to activate your account.
          </p>
        </div>

        <p className="mt-6 text-center text-sm text-brand-muted">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-brand-accent font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* Heading */}
      <h1 className="text-[2.5rem] font-heading font-extrabold tracking-tight leading-tight text-brand-black">
        Create Account
      </h1>
      <p className="mt-2 text-sm text-brand-muted">
        Join The Print Shop Lagos
      </p>

      {/* Error Message */}
      {errorMsg && (
        <div className="mt-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
          {errorMsg}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-4">
        {/* Full Name */}
        <div className="relative">
          <input
            id="signup-name"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            autoComplete="name"
            placeholder=" "
            disabled={isLoading}
            className="peer w-full px-4 pt-5 pb-2 text-sm text-brand-black bg-transparent border border-brand-border rounded-lg outline-none focus:border-brand-black transition-colors duration-200 disabled:opacity-50"
          />
          <label
            htmlFor="signup-name"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-brand-muted pointer-events-none transition-all duration-200 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2.5 peer-focus:text-[11px] peer-focus:text-brand-black peer-[:not(:placeholder-shown)]:top-2.5 peer-[:not(:placeholder-shown)]:text-[11px]"
          >
            Full Name
          </label>
        </div>

        {/* Email */}
        <div className="relative">
          <input
            id="signup-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            placeholder=" "
            disabled={isLoading}
            className="peer w-full px-4 pt-5 pb-2 text-sm text-brand-black bg-transparent border border-brand-border rounded-lg outline-none focus:border-brand-black transition-colors duration-200 disabled:opacity-50"
          />
          <label
            htmlFor="signup-email"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-brand-muted pointer-events-none transition-all duration-200 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2.5 peer-focus:text-[11px] peer-focus:text-brand-black peer-[:not(:placeholder-shown)]:top-2.5 peer-[:not(:placeholder-shown)]:text-[11px]"
          >
            Email
          </label>
        </div>

        {/* Password */}
        <div className="relative">
          <input
            id="signup-password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="new-password"
            placeholder=" "
            disabled={isLoading}
            className="peer w-full px-4 pt-5 pb-2 text-sm text-brand-black bg-transparent border border-brand-border rounded-lg outline-none focus:border-brand-black transition-colors duration-200 pr-12 disabled:opacity-50"
          />
          <label
            htmlFor="signup-password"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-brand-muted pointer-events-none transition-all duration-200 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2.5 peer-focus:text-[11px] peer-focus:text-brand-black peer-[:not(:placeholder-shown)]:top-2.5 peer-[:not(:placeholder-shown)]:text-[11px]"
          >
            Password
          </label>
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-brand-muted hover:text-brand-black transition-colors"
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 my-2">
          <div className="flex-1 h-px bg-brand-border" />
          <span className="text-xs text-brand-muted">or</span>
          <div className="flex-1 h-px bg-brand-border" />
        </div>

        {/* Google Sign Up */}
        <button
          type="button"
          onClick={handleGoogleSignup}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-brand-border rounded-lg text-sm text-brand-black font-medium hover:bg-brand-black/[0.02] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4" />
            <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853" />
            <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05" />
            <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335" />
          </svg>
          Sign up with Google
        </button>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3.5 bg-brand-accent text-white text-sm font-semibold rounded-full hover:bg-brand-accent/90 transition-colors duration-200 mt-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isPending ? (
            <>
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Creating account...
            </>
          ) : (
            'Create Account'
          )}
        </button>
      </form>

      {/* Login link */}
      <p className="mt-6 text-center text-sm text-brand-muted">
        Already have an account?{' '}
        <Link href="/auth/login" className="text-brand-accent font-semibold hover:underline">
          Login
        </Link>
      </p>

      {/* Full Screen Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm">
          <GlobalLoader size="lg" className="scale-150" />
        </div>
      )}
    </div>
  );
}
