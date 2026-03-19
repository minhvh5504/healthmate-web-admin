import { API_BASE_URL } from '@/constants/api';
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { getSession, signOut } from 'next-auth/react';
import type { Session } from 'next-auth';

const API_URL = API_BASE_URL;

type Pending = {
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
  config: AxiosRequestConfig & { _retry?: boolean };
};

let isRefreshing = false;
let failedQueue: Pending[] = [];

/** Process queue */
const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach(req => {
    if (error) {
      req.reject(error);
    } else {
      const headers = { ...(req.config.headers ?? {}) };
      if (token) headers.Authorization = `Bearer ${token}`;
      req.config.headers = headers;
      req.resolve(axiosInstance(req.config));
    }
  });
  failedQueue = [];
};

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

/** Request: gắn Bearer từ NextAuth session */
axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const session = await getSession();

    const token = (session as Session | null)?.accessToken;
    config.headers = config.headers ?? {};
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  error => Promise.reject(error)
);

/** Response: 401 -> xếp hàng đợi, đợi refresh xong -> retry 1 lần */
axiosInstance.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    const original = (error.config ?? {}) as AxiosRequestConfig & { _retry?: boolean };

    // debugger;
    // Nếu không phải 401 hoặc đã retry 1 lần -> throw luôn
    if (error.response?.status !== 401 || original._retry) {
      return Promise.reject(error);
    }

    // Whitelist: các endpoint không cần auth, không retry khi 401
    const publicEndpoints = [
      '/auth/admin/refresh-token',
      '/auth/admin/login',
      '/auth/admin/register',
      '/auth/admin/forgot-password',
      '/auth/admin/verify',
      '/auth/admin/resend-code',
      '/auth/admin/check-validcode',
      '/auth/admin/reset-password'
    ];
    if (publicEndpoints.some(endpoint => original.url?.includes(endpoint))) {
      return Promise.reject(error);
    }

    original._retry = true;

    if (isRefreshing) {
      // Join hàng đợi
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject, config: original });
      });
    }

    try {
      isRefreshing = true;

      // Cách đúng với NextAuth: chỉ cần gọi lại getSession()
      // NextAuth sẽ tự chạy jwt() -> refreshAccessToken() nếu đến hạn
      const newSession = await getSession();
      const newToken = (newSession as Session | null)?.accessToken || null;
      console.log('newToken', newSession);

      // Báo cho queue
      processQueue(null, newToken);

      if (!newToken) {
        await signOut({ callbackUrl: '/login' });
        return Promise.reject(error);
      }

      // Retry request gây 401
      const headers = { ...(original.headers ?? {}) };
      headers.Authorization = `Bearer ${newToken}`;
      original.headers = headers;

      return axiosInstance(original);
    } catch (e) {
      console.log('e', e);
      processQueue(new Error('Refresh failed'), null);
      await signOut({ callbackUrl: '/login' });
      return Promise.reject(e);
    } finally {
      isRefreshing = false;
    }
  }
);

/** API client helper - handles NestJS response format */
export async function apiClient<T>(
  endpoint: string,
  options: Omit<AxiosRequestConfig, 'baseURL' | 'url'> & { returnFullResponse?: boolean } = {}
): Promise<T> {
  try {
    const res: AxiosResponse = await axiosInstance({ url: endpoint, ...options });
    const data = res.data;

    // NestJS success response format: { statusCode: 200/201, message, data }
    // Or custom format: { code: '00', message, data }
    if (data && typeof data === 'object' && 'data' in data) {
      if (options.returnFullResponse) {
        return data as T;
      }
      return data.data as T;
    }

    // Raw response (không có wrapper)
    return data as T;
  } catch (error: unknown) {
    // Extract error message from backend response
    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as AxiosError<{
        statusCode?: number;
        message?: string | string[];
        error?: string;
      }>;

      const responseData = axiosError.response?.data;

      if (responseData) {
        // NestJS validation error: message is array
        if (Array.isArray(responseData.message)) {
          throw new Error(responseData.message.join(', '));
        }

        // NestJS error: message is string
        if (responseData.message) {
          throw new Error(responseData.message);
        }

        // Generic error field
        if (responseData.error) {
          throw new Error(responseData.error);
        }
      }
    }

    // Fallback to original error
    throw error;
  }
}
