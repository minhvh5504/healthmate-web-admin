import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '@/services/dashboard-service';

/**
 * Query Keys for React Query cache management
 */
export const dashboardQueryKeys = {
  all: ['dashboard'] as const,
  statistics: () => [...dashboardQueryKeys.all, 'statistics'] as const,
  dashboardStats: () => [...dashboardQueryKeys.statistics(), 'dashboard-stats'] as const,
  chartData: (type: string, date?: string) => [...dashboardQueryKeys.statistics(), 'chart-data', type, date] as const,
  recentBookings: () => [...dashboardQueryKeys.all, 'recent-bookings'] as const,
};

/**
 * Hook: Get dashboard summary statistics
 */
export function useDashboardStats() {
  return useQuery({
    queryKey: dashboardQueryKeys.dashboardStats(),
    queryFn: () => dashboardService.getDashboardStats(),
    staleTime: 30000, // 30 seconds
  });
}

/**
 * Hook: Get chart data for dashboard
 */
export function useDashboardChartData(type: 'week' | 'month' | 'year' = 'year', date?: string) {
  return useQuery({
    queryKey: dashboardQueryKeys.chartData(type, date),
    queryFn: () => dashboardService.getChartData(type, date),
    staleTime: 30000, // 30 seconds
  });
}

/**
 * Hook: Get recent bookings for dashboard table
 */
export function useRecentBookings() {
  return useQuery({
    queryKey: dashboardQueryKeys.recentBookings(),
    queryFn: () => dashboardService.getRecentBookings(),
    staleTime: 30000, // 30 seconds
  });
}
