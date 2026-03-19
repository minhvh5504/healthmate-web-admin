import { useQuery } from '@tanstack/react-query';
import { userProfileService } from '@/services/user-service';

// Query keys
export const userProfileKeys = {
  all: ['user-profile'] as const,
  current: () => [...userProfileKeys.all, 'current'] as const,
};

/**
 * Hook to fetch current user profile
 */
export function useUserProfile(enabled = true) {
  return useQuery({
    queryKey: userProfileKeys.current(),
    queryFn: () => userProfileService.getUserProfile(),
    staleTime: 300000, // 5 minutes - user data doesn't change often
    enabled,
  });
}
