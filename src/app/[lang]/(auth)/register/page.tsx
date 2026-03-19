import RegisterForm from '@/components/app/auth/form-register';

export const metadata = {
  robots: { index: false, follow: false },
};

export default function SignUpPage() {
  return <RegisterForm />;
}
