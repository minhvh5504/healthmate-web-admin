import { API_ENDPOINTS } from "@/constants/api";
import { apiClient } from "@/lib/api-client";

export interface NotificationTimeSlot {
  id: string;
  slug: string;
  displayName: string;
  defaultTime: string;
  createdAt: string;
  updatedAt: string;
}

class TimeSlotService {
  /**
   * Get all notification time slots
   */
  async getAllTimeSlots(): Promise<NotificationTimeSlot[]> {
    return await apiClient<NotificationTimeSlot[]>(API_ENDPOINTS.NOTIFICATION_TIME_SLOTS.BASE, {
      method: "GET",
    });
  }

  /**
   * Create new notification time slot
   */
  async createTimeSlot(data: Partial<NotificationTimeSlot>): Promise<NotificationTimeSlot> {
    return await apiClient<NotificationTimeSlot>(API_ENDPOINTS.NOTIFICATION_TIME_SLOTS.BASE, {
      method: "POST",
      data,
    });
  }

  /**
   * Update notification time slot
   */
  async updateTimeSlot(id: string, data: Partial<NotificationTimeSlot>): Promise<NotificationTimeSlot> {
    return await apiClient<NotificationTimeSlot>(API_ENDPOINTS.NOTIFICATION_TIME_SLOTS.DETAIL(id), {
      method: "PATCH",
      data,
    });
  }
}

export const timeSlotService = new TimeSlotService();
