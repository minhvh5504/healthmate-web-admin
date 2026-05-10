import { API_ENDPOINTS } from "@/constants/api";
import { apiClient } from "@/lib/api-client";

export interface MedicationCondition {
  id: string;
  slug: string;
  displayName: string;
  iconEmoji?: string;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

class ConditionService {
  /**
   * Get all medication conditions (Admin)
   */
  async getAllConditions(): Promise<MedicationCondition[]> {
    return await apiClient<MedicationCondition[]>(API_ENDPOINTS.MEDICATION_CONDITIONS.ALL, {
      method: "GET",
    });
  }

  /**
   * Get specific condition detail
   */
  async getConditionDetail(id: string): Promise<MedicationCondition> {
    return await apiClient<MedicationCondition>(API_ENDPOINTS.MEDICATION_CONDITIONS.DETAIL(id), {
      method: "GET",
    });
  }

  /**
   * Create new medication condition
   */
  async createCondition(data: Partial<MedicationCondition>): Promise<MedicationCondition> {
    return await apiClient<MedicationCondition>(API_ENDPOINTS.MEDICATION_CONDITIONS.BASE, {
      method: "POST",
      data,
    });
  }

  /**
   * Update medication condition
   */
  async updateCondition(id: string, data: Partial<MedicationCondition>): Promise<MedicationCondition> {
    return await apiClient<MedicationCondition>(API_ENDPOINTS.MEDICATION_CONDITIONS.DETAIL(id), {
      method: "PATCH",
      data,
    });
  }

  /**
   * Delete medication condition
   */
  async deleteCondition(id: string): Promise<void> {
    await apiClient<void>(API_ENDPOINTS.MEDICATION_CONDITIONS.DETAIL(id), {
      method: "DELETE",
    });
  }
}

export const conditionService = new ConditionService();
