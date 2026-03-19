'use client';

import { useQueryClient as useReactQueryClient } from '@tanstack/react-query';

/**
 * Hook to access the React Query client instance
 */
export function useQueryClient() {
  return useReactQueryClient();
}
