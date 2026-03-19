'use client';
import { Suspense } from 'react';
import { usePathname } from 'next/navigation';
// import NavBar from '@/components/nav-bar';

import { AuthProvider } from '@/lib/auth-provider';
import { QueryProvider } from '@/lib/query-provider';
import { LanguageProvider } from '@/lib/language-provider';

import { Toaster } from 'sonner';
import NavigationLoading from '@/components/navigation-loading';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hiddenRoutes = [
    '/login',
    '/signup',
    '/otp',
    '/register',
    '/reset-password',
    '/forgot-password',
    '/dashboard',
  ];
  const isHidden = hiddenRoutes.some(r => pathname.includes(r));

  return (
    <AuthProvider>
      <QueryProvider>
        <LanguageProvider>
          <Suspense fallback={null}>
            {/* <NavigationLoading /> */}
          </Suspense>
          <div className="flex min-h-screen flex-col">
            {/* {!isHidden && <NavBar />} */}
            <main className="flex-1">{children}</main>

          </div>
          <Toaster position="top-center" duration={2000} richColors />
        </LanguageProvider>
      </QueryProvider>
    </AuthProvider>
  );
}
