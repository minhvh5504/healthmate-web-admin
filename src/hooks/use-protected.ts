'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useNextAuth } from './use-next-auth';

/**
 * Hook for client-side route protection
 * @param redirectTo Where to redirect unauthenticated users
 */
export function useProtectedRoute(redirectTo = '/login') {
  const { isLoading, isAuthenticated } = useNextAuth();
  const router = useRouter();

  useEffect(() => {
    // Wait until authentication status is determined
    if (!isLoading && !isAuthenticated) {
      router.push(redirectTo);
    }
  }, [isLoading, isAuthenticated, router, redirectTo]);

  return { isLoading, isAuthenticated };
}
