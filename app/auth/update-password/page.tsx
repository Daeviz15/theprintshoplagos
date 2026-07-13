import AuthLayout from '@/components/features/Auth/AuthLayout';
import UpdatePasswordForm from '@/components/features/Auth/UpdatePasswordForm';

export default function UpdatePasswordPage() {
  return (
    <AuthLayout
      imageSrc="/img_5.png"
      artistName="The Print Shop"
      artworkTitle="New Beginning"
    >
      <UpdatePasswordForm />
    </AuthLayout>
  );
}
