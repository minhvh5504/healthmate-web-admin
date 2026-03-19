export interface StatItem {
  total: number;
  change: number;
}

export interface ChartDataPoint {
  label: string;
  revenue: number;
  users: number;
  bookings: number;
}

export interface RecentBooking {
  id: string;
  totalPrice: number;
  status: string;
  bookedAt: string;
  hotel: {
    _id?: string;
    name?: string;
    address?: string;
    [key: string]: any;
  };
}
