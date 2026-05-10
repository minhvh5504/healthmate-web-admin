import { API_ENDPOINTS } from "@/constants/api";
import { apiClient } from "@/lib/api-client";

export interface Medication {
  id: string;
  name: string;
  genericName?: string;
  form?: string;
  dosage?: string;
  manufacturer?: string;
  description?: string;
  imageUrl?: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MedicationListResponse {
  medications: Medication[];
  total: number;
  page: number;
  limit: number;
}

class MedicationService {
  /**
   * Get all medications with pagination
   */
  async getAllMedications(
    page = 1,
    limit = 10,
    search?: string,
  ): Promise<MedicationListResponse> {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
    if (search) queryParams.append("q", search);

    const endpoint = search
      ? `${API_ENDPOINTS.MEDICATION.SEARCH}?${queryParams.toString()}`
      : `${API_ENDPOINTS.MEDICATION.BASE}?${queryParams.toString()}`;

    return await apiClient<MedicationListResponse>(endpoint, {
      method: "GET",
    });
  }

  /**
   * Get medication detail
   */
  async getMedicationDetail(id: string): Promise<Medication> {
    return await apiClient<Medication>(API_ENDPOINTS.MEDICATION.DETAIL(id), {
      method: "GET",
    });
  }

  /**
   * Create new medication
   */
  async createMedication(data: Partial<Medication>): Promise<Medication> {
    return await apiClient<Medication>(API_ENDPOINTS.MEDICATION.BASE, {
      method: "POST",
      data,
    });
  }

  /**
   * Update medication
   */
  async updateMedication(
    id: string,
    data: Partial<Medication>,
  ): Promise<Medication> {
    return await apiClient<Medication>(API_ENDPOINTS.MEDICATION.DETAIL(id), {
      method: "PATCH",
      data,
    });
  }

  /**
   * Delete medication
   */
  async deleteMedication(id: string): Promise<void> {
    await apiClient<void>(API_ENDPOINTS.MEDICATION.DETAIL(id), {
      method: "DELETE",
    });
  }
}

export const medicationService = new MedicationService();
