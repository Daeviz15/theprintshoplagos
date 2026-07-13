'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import { forgotPassword } from '@/app/auth/actions';

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!email.trim()) {
      setErrorMsg('Email is required.');
      return;
    }

    startTransition(async () => {
      const formData = new FormData();
      formData.append('email', email);

      const result = await forgotPassword(formData);
      if (result?.error) {
        setErrorMsg(result.error);
      } else if (result?.success) {
        setIsSubmitted(true);
      }
    });
  };

  return (
    <div className="flex flex-col">
      {/* Heading */}
      <h1 className="text-[2.5rem] font-black tracking-tight leading-tight text-brand-black">
        Reset Password
      </h1>
      <p className="mt-2 text-sm text-brand-muted">
        Enter your email to receive a password reset link.
      </p>

      {/* Error Message */}
      {errorMsg && (
        <div className="mt-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
          {errorMsg}
        </div>
      )}

      {/* Form */}
      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-4">
          {/* Email */}
          <div className="relative">
            <input
              id="reset-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              placeholder=" "
              disabled={isPending}
              className="peer w-full px-4 pt-5 pb-2 text-sm text-brand-black bg-transparent border border-brand-border rounded-lg outline-none focus:border-brand-black transition-colors duration-200 disabled:opacity-50"
            />
            <label
              htmlFor="reset-email"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-brand-muted pointer-events-none transition-all duration-200 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2.5 peer-focus:text-[11px] peer-focus:text-brand-black peer-[:not(:placeholder-shown)]:top-2.5 peer-[:not(:placeholder-shown)]:text-[11px]"
            >
              Email
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full py-3.5 bg-brand-accent text-white text-sm font-semibold rounded-full hover:bg-brand-accent/90 transition-colors duration-200 mt-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isPending ? (
              <>
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Sending...
              </>
            ) : (
              'Send Reset Link'
            )}
          </button>
        </form>
      ) : (
        <div className="mt-10 p-6 rounded-lg bg-brand-black/[0.02] border border-brand-border flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 rounded-full bg-brand-accent/10 flex items-center justify-center mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L9 17L4 12" stroke="#F46A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>
            <h3 className="text-lg font-semibold text-brand-black mb-2">Check your email</h3>
            <p className="text-sm text-brand-muted">
                We&apos;ve sent a password reset link to <br/> <span className="font-medium text-brand-black">{email}</span>
            </p>
        </div>
      )}

      {/* Back to Login link */}
      <p className="mt-6 text-center text-sm text-brand-muted">
        Remember your password?{' '}
        <Link href="/auth/login" className="text-brand-accent font-semibold hover:underline">
          Back to Login
        </Link>
      </p>
    </div>
  );
}
