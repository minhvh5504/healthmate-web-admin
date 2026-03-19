// API URL for Nest.js backend
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: '/admin/auth/login',
        REGISTER: '/admin/auth/register',
        REFRESH_TOKEN: '/admin/auth/refresh',
        LOGOUT: '/admin/auth/logout',
    },
    USERS: {
        PROFILE: '/users/profile',
        STATISTICS: '/users/statistics',
    },
    HOTELS: {
        STATISTICS: '/hotels/statistics',
        DISTANCE: '/hotels/distance',
    },
    BOOKINGS: {
        BASE: '/bookings',
        LIST: '/bookings',
        PENDING_STATISTICS: '/bookings/statistics/pending',
        REQUEST_STATISTICS: '/bookings/statistics/requests',
    },
    STATISTICS: {
        DASHBOARD: '/statistics/dashboard',
        CHART: '/statistics/chart',
        RECENT_BOOKINGS: '/statistics/recent-bookings',
    },
};
