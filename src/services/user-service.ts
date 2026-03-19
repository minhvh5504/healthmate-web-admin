import { API_ENDPOINTS } from '@/constants/api';
import { apiClient } from '@/lib/api-client';
import { UserProfile } from '@/types/api/response/user.response';

class UserProfileService {
  /**
   * Get current user profile
   */
  async getUserProfile(): Promise<UserProfile> {
    const response = await apiClient<UserProfile>(API_ENDPOINTS.USERS.PROFILE, {
      method: 'GET',
    });
    return response;
  }
}

export const userProfileService = new UserProfileService();
