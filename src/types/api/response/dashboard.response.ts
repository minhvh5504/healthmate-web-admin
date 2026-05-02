import {
  StatItem,
  ChartDataPoint,
  RecentUser,
} from "@/types/entities/dashboard.entity";

/**
 * Backend Statistics Dashboard Response
 */
export interface BackendDashboardStats {
  users: StatItem;
}

/**
 * Chart Data Response
 */
export type BackendChartDataPoint = ChartDataPoint;

/**
 * Recent User Response
 */
export type BackendRecentUser = RecentUser;
