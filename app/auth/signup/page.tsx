import AuthLayout from '@/components/features/Auth/AuthLayout';
import SignupForm from '@/components/features/Auth/SignupForm';
import { Suspense } from 'react';

export default function SignupPage() {
  return (
    <AuthLayout
      imageSrc="/art_2.png"
      artistName="Yoruba Prints"
      artworkTitle="Dichotomy"
    >
      <Suspense fallback={<div className="h-[400px] flex items-center justify-center text-sm text-brand-muted">Loading...</div>}>
        <SignupForm />
      </Suspense>
    </AuthLayout>
  );
}
