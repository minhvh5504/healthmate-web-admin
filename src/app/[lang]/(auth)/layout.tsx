import type { Metadata } from 'next';
import AuthLayout from '@/components/app/auth/AuthLayout';

export const metadata: Metadata = {
  title: 'Sign in | YourApp',
};

export default function AuthGroupLayout({ children }: { children: React.ReactNode }) {
  return (
      <AuthLayout imageSrc="/hotel.svg" imageAlt="Hotel" imageSide="right" imagePriority>
        {children}
      </AuthLayout>
  );
}
