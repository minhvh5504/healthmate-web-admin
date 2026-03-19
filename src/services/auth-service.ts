import { apiClient } from '../lib/api-client';
import {
  RegisterPayload,
  LoginPayload,
  ResetPayload,
  VerifyPayload,
  ResendCodePayload,
  CheckValidCodePayload
} from '@/types/api/request/auth.request';
import {
  UserData,
  AuthResponse,
  RegisterResponse,
  LoginResponse,
  ResetResponse,
  SendResetResponse,
  VerifyOtpResponse,
  ResendOtpResponse
} from '@/types/api/response/auth.response';

export const authService = {
  /**
   * Register a new user
   */
  register: async (payload: RegisterPayload): Promise<RegisterResponse> => {
    try {
      const response = await apiClient<UserData>('auth/admin/register', {
        method: 'POST',
        data: payload,
      });

      return {
        ok: true,
        redirectTo: '/otp',
        user: response,
      };
    } catch (error) {
      return {
        ok: false,
        redirectTo: '',
        message: error instanceof Error ? error.message : 'Registration failed',
      };
    }
  },

  /**
   * Reset password
   */
  resetPassword: async (payload: ResetPayload): Promise<ResetResponse> => {
    try {
      await apiClient<void>('auth/admin/reset-password', {
        method: 'POST',
        data: payload,
      });

      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        message: error instanceof Error ? error.message : 'Password reset failed',
      };
    }
  },

  /**
   * Check valid code (for forgot password)
   */
  checkValidCode: async (payload: CheckValidCodePayload): Promise<VerifyOtpResponse> => {
    try {
      const response = await apiClient<{ token: string }>('auth/admin/check-validcode', {
        method: 'POST',
        data: payload,
      });

      return {
        ok: true,
        token: response.token,
      };
    } catch (error) {
      return {
        ok: false,
        message: error instanceof Error ? error.message : 'Invalid code',
      };
    }
  },

  /**
   * Resend code
   */
  resendCode: async (payload: ResendCodePayload): Promise<ResendOtpResponse> => {
    try {
      await apiClient<void>('auth/admin/resend-code', {
        method: 'POST',
        data: payload,
      });

      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        message: error instanceof Error ? error.message : 'Code resend failed',
      };
    }
  },

  /**
   * Verify account with code (for registration)
   */
  verifyAccount: async (payload: VerifyPayload): Promise<VerifyOtpResponse> => {
    try {
      await apiClient<void>('auth/admin/verify', {
        method: 'POST',
        data: payload,
      });

      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        message: error instanceof Error ? error.message : 'Verification failed',
      };
    }
  },

  /**
   * Send reset password code
   */
  sendResetPassCode: async (email: string): Promise<SendResetResponse> => {
    try {
      await apiClient<void>('auth/admin/forgot-password', {
        method: 'POST',
        data: { email },
      });

      return {
        ok: true,
        redirectTo: '/otp',
      };
    } catch (error: unknown) {
      return {
        ok: false,
        redirectTo: '',
        message:
          error instanceof Error ? error.message : 'Failed to send reset code',
      };
    }
  },

  /**
   * Login user
   */
  login: async (payload: LoginPayload): Promise<LoginResponse> => {
    try {
      const response = await apiClient<AuthResponse>('auth/admin/login', {
        method: 'POST',
        data: payload,
      });

      return {
        ok: true,
        redirectTo: '/',
        user: response.user,
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
      };
    } catch (error) {
      return {
        ok: false,
        redirectTo: '',
        message: error instanceof Error ? error.message : 'Login failed',
      };
    }
  },

  /**
   * Logout user
   */
  logout: async (): Promise<{ ok: boolean }> => {
    try {
      await apiClient<void>('auth/admin/logout', {
        method: 'POST',
      });
      return { ok: true };
    } catch (error) {
      return {
        ok: false,
      };
    }
  },
};
