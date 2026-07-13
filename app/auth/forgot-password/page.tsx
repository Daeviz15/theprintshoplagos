import AuthLayout from '@/components/features/Auth/AuthLayout';
import ForgotPasswordForm from '@/components/features/Auth/ForgotPasswordForm';

export default function ForgotPasswordPage() {
  return (
    <AuthLayout
      imageSrc="/img_5.png"
      artistName="The Print Shop"
      artworkTitle="Abstract Flow"
    >
      <ForgotPasswordForm />
    </AuthLayout>
  );
}
