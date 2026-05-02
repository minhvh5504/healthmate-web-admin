export interface StatItem {
  total: number;
  active: number;
  change: number;
}

export interface ChartDataPoint {
  label: string;
  users: number;
}

export interface RecentUser {
  id: string;
  fullName: string;
  email: string;
  phoneNumber?: string;
  avatar?: string;
  createdAt: string;
}
