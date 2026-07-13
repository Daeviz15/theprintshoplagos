import AuthLayout from '@/components/features/Auth/AuthLayout';
import LoginForm from '@/components/features/Auth/LoginForm';
import { Suspense } from 'react';

export default function LoginPage() {
  return (
    <AuthLayout
      imageSrc="/products/art-gallery-1.jpg"
      artistName="Laolu Senbanjo"
      artworkTitle="Sacred Art of the Ori"
    >
      <Suspense fallback={<div className="h-[400px] flex items-center justify-center text-sm text-brand-muted">Loading...</div>}>
        <LoginForm />
      </Suspense>
    </AuthLayout>
  );
}
