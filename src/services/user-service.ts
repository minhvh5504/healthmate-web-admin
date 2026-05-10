import { API_ENDPOINTS } from "@/constants/api";
import { apiClient } from "@/lib/api-client";

export interface AdminUserListResponse {
  users: any[];
  total: number;
  page: number;
  limit: number;
}

class UserProfileService {
  /**
   * Get current user profile
   */
  async getUserProfile(): Promise<any> {
    const response = await apiClient<any>(API_ENDPOINTS.PROFILE.ME, {
      method: "GET",
    });
    return response;
  }

  /**
   * [ADMIN] Get all users with pagination and filtering
   */
  async getAllUsers(
    page = 1,
    limit = 10,
    status?: string,
  ): Promise<AdminUserListResponse> {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
    if (status && status !== "all") queryParams.append("status", status);

    const response = await apiClient<AdminUserListResponse>(
      `${API_ENDPOINTS.PROFILE.ADMIN_ALL}?${queryParams.toString()}`,
      { method: "GET" },
    );
    return response;
  }

  /**
   * [ADMIN] Get user details
   */
  async getUserDetail(id: string): Promise<any> {
    const response = await apiClient<any>(API_ENDPOINTS.PROFILE.ADMIN_DETAIL(id), {
      method: "GET",
    });
    return response;
  }

  /**
   * [ADMIN] Toggle user status
   */
  async toggleUserStatus(id: string): Promise<any> {
    const response = await apiClient<any>(API_ENDPOINTS.PROFILE.ADMIN_STATUS(id), {
      method: "PATCH",
    });
    return response;
  }

  /**
   * [ADMIN] Delete user
   */
  async deleteUser(id: string): Promise<any> {
    const response = await apiClient<any>(API_ENDPOINTS.PROFILE.ADMIN_DELETE(id), {
      method: "DELETE",
    });
    return response;
  }
}

export const userProfileService = new UserProfileService();

