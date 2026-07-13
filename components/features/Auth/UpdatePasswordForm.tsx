'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import { updatePassword } from '@/app/auth/actions';

export default function UpdatePasswordForm() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Client-side validation
    if (!password || !confirmPassword) {
      setErrorMsg('Both password fields are required.');
      return;
    }

    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    startTransition(async () => {
      const formData = new FormData();
      formData.append('password', password);
      formData.append('confirmPassword', confirmPassword);

      const result = await updatePassword(formData);
      if (result?.error) {
        setErrorMsg(result.error);
      }
    });
  };

  return (
    <div className="flex flex-col">
      {/* Heading */}
      <h1 className="text-[2.5rem] font-black tracking-tight leading-tight text-brand-black">
        New Password
      </h1>
      <p className="mt-2 text-sm text-brand-muted">
        Choose a new password for your account.
      </p>

      {/* Error Message */}
      {errorMsg && (
        <div className="mt-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
          {errorMsg}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-4">
        {/* New Password */}
        <div className="relative">
          <input
            id="new-password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="new-password"
            placeholder=" "
            disabled={isPending}
            className="peer w-full px-4 pt-5 pb-2 text-sm text-brand-black bg-transparent border border-brand-border rounded-lg outline-none focus:border-brand-black transition-colors duration-200 pr-12 disabled:opacity-50"
          />
          <label
            htmlFor="new-password"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-brand-muted pointer-events-none transition-all duration-200 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2.5 peer-focus:text-[11px] peer-focus:text-brand-black peer-[:not(:placeholder-shown)]:top-2.5 peer-[:not(:placeholder-shown)]:text-[11px]"
          >
            New Password
          </label>
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-brand-muted hover:text-brand-black transition-colors"
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>

        {/* Confirm Password */}
        <div className="relative">
          <input
            id="confirm-password"
            type={showPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            autoComplete="new-password"
            placeholder=" "
            disabled={isPending}
            className="peer w-full px-4 pt-5 pb-2 text-sm text-brand-black bg-transparent border border-brand-border rounded-lg outline-none focus:border-brand-black transition-colors duration-200 disabled:opacity-50"
          />
          <label
            htmlFor="confirm-password"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-brand-muted pointer-events-none transition-all duration-200 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2.5 peer-focus:text-[11px] peer-focus:text-brand-black peer-[:not(:placeholder-shown)]:top-2.5 peer-[:not(:placeholder-shown)]:text-[11px]"
          >
            Confirm Password
          </label>
        </div>

        {/* Password strength hint */}
        <p className="text-xs text-brand-muted -mt-2">
          Minimum 6 characters required.
        </p>

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
              Updating...
            </>
          ) : (
            'Update Password'
          )}
        </button>
      </form>

      {/* Back to Login link */}
      <p className="mt-6 text-center text-sm text-brand-muted">
        <Link href="/auth/login" className="text-brand-accent font-semibold hover:underline">
          Back to Login
        </Link>
      </p>
    </div>
  );
}
