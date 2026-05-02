// API URL for Nest.js backend
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/admin/auth/login",
    REGISTER: "/admin/auth/register",
    REFRESH_TOKEN: "/admin/auth/refresh",
    LOGOUT: "/admin/auth/logout",
  },
  USERS: {
    PROFILE: "/users/profile",
    STATISTICS: "/users/statistics",
  },
  STATISTICS: {
    DASHBOARD: "/statistics/dashboard",
    CHART: "/statistics/chart",
    RECENT_USERS: "/statistics/recent-users",
  },
};
