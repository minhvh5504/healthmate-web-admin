// API URL for Nest.js backend
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.dieuduong.vn/api';

export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: '/auth/login',
        REGISTER: '/auth/register',
        REFRESH_TOKEN: '/auth/refresh',
        LOGOUT: '/auth/logout',
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
