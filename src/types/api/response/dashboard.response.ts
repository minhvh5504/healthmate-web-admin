import { StatItem, ChartDataPoint, RecentBooking } from '@/types/entities/dashboard.entity';

/**
 * Backend Statistics Dashboard Response
 */
export interface BackendDashboardStats {
    users: StatItem;
    bookings: StatItem;
    revenue: StatItem;
    pending: StatItem;
}

/**
 * Chart Data Response
 */
export type BackendChartDataPoint = ChartDataPoint;

/**
 * Recent Booking Response
 */
export type BackendRecentBooking = RecentBooking;
