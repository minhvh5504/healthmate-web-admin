import { apiClient } from '@/lib/api-client';
import { API_ENDPOINTS } from '@/constants/api';
import type {
  BackendDashboardStats,
  BackendChartDataPoint,
  BackendRecentBooking,
} from '@/types/api/response/dashboard.response';
import type { ChartPeriod } from '@/types/api/request/dashboard.request';

/**
 * Dashboard Service
 * Handles all dashboard-related API calls
 */
class DashboardService {
  /**
   * Get dashboard statistics
   */
  async getDashboardStats(): Promise<BackendDashboardStats> {
    return apiClient<BackendDashboardStats>(API_ENDPOINTS.STATISTICS.DASHBOARD, {
      method: 'GET',
    });
  }

  /**
   * Get chart data
   */
  async getChartData(
    type: ChartPeriod = 'year',
    date?: string
  ): Promise<BackendChartDataPoint[]> {
    const queryParams = new URLSearchParams();
    queryParams.append('type', type);
    if (date) queryParams.append('date', date);

    const queryString = queryParams.toString();
    const endpoint = queryString
      ? `${API_ENDPOINTS.STATISTICS.CHART}?${queryString}`
      : API_ENDPOINTS.STATISTICS.CHART;

    return apiClient<BackendChartDataPoint[]>(endpoint, {
      method: 'GET',
    });
  }

  /**
   * Get recent bookings
   */
  async getRecentBookings(): Promise<BackendRecentBooking[]> {
    return apiClient<BackendRecentBooking[]>(API_ENDPOINTS.STATISTICS.RECENT_BOOKINGS, {
      method: 'GET',
    });
  }
}

export const dashboardService = new DashboardService();
