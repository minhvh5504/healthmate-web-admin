'use client';
import { Suspense } from 'react';

import { AuthProvider } from '@/lib/auth-provider';
import { QueryProvider } from '@/lib/query-provider';
import { LanguageProvider } from '@/lib/language-provider';

import { Toaster } from '@/components/ui/sonner';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AuthProvider>
        <QueryProvider>
          <LanguageProvider>
            <Suspense fallback={null}>
              {/* <NavigationLoading /> */}
            </Suspense>
            <div className="flex min-h-screen flex-col">
              {/* <NavBar /> */}
              <main className="flex-1">{children}</main>
            </div>
          </LanguageProvider>
        </QueryProvider>
      </AuthProvider>
      <Toaster position="top-center" duration={3000} richColors />
    </>
  );
}
