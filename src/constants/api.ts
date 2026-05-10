// API URL for Nest.js backend
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/admin/auth/login",
    REGISTER: "/admin/auth/register",
    REFRESH_TOKEN: "/admin/auth/refresh",
    LOGOUT: "/admin/auth/logout",
    RESEND_OTP: "/admin/auth/resend-otp",
    VERIFY_EMAIL: "/admin/auth/verify-email",
  },
  PROFILE: {
    ME: "/profile",
    ADMIN_ALL: "/profile/admin/all",
    ADMIN_DETAIL: (id: string) => `/profile/admin/${id}`,
    ADMIN_STATUS: (id: string) => `/profile/admin/${id}/status`,
    ADMIN_DELETE: (id: string) => `/profile/admin/${id}`,
  },
  STATISTICS: {
    DASHBOARD: "/statistics/dashboard",
    CHART: "/statistics/chart",
    RECENT_USERS: "/statistics/recent-users",
  },
  MEDICATION: {
    BASE: "/medication",
    SEARCH: "/medication/search",
    DETAIL: (id: string) => `/medication/${id}`,
  },
  NOTIFICATION_TIME_SLOTS: {
    BASE: "/notification-time-slots",
    DETAIL: (id: string) => `/notification-time-slots/${id}`,
  },
  MEDICATION_CONDITIONS: {
    BASE: "/medication-conditions",
    ALL: "/medication-conditions/all",
    DETAIL: (id: string) => `/medication-conditions/${id}`,
  },
  UPLOAD: {
    ICON: "/upload/icon",
    AVATAR: "/upload/avatar",
  },
};
