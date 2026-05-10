import { API_ENDPOINTS } from "@/constants/api";
import { apiClient } from "../lib/api-client";
import {
  RegisterPayload,
  LoginPayload,
  ResetPayload,
  VerifyPayload,
  ResendCodePayload,
  CheckValidCodePayload,
} from "@/types/api/request/auth.request";
import {
  UserData,
  AuthResponse,
  RegisterResponse,
  LoginResponse,
  ResetResponse,
  SendResetResponse,
  VerifyOtpResponse,
  ResendOtpResponse,
  LogoutResponse,
} from "@/types/api/response/auth.response";

export const authService = {
  /**
   * Register a new user
   */
  register: async (payload: RegisterPayload): Promise<RegisterResponse> => {
    try {
      const response = await apiClient<UserData>(API_ENDPOINTS.AUTH.REGISTER, {
        method: "POST",
        data: payload,
      });

      return {
        ok: true,
        redirectTo: "/otp",
        user: response,
      };
    } catch (error) {
      return {
        ok: false,
        redirectTo: "",
        message: error instanceof Error ? error.message : "Registration failed",
      };
    }
  },

  /**
   * Reset password
   */
  resetPassword: async (payload: ResetPayload): Promise<ResetResponse> => {
    try {
      await apiClient<void>("/auth/reset-password", {
        method: "POST",
        data: payload,
      });

      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        message:
          error instanceof Error ? error.message : "Password reset failed",
      };
    }
  },

  /**
   * Check valid code (for forgot password)
   */
  checkValidCode: async (
    payload: CheckValidCodePayload,
  ): Promise<VerifyOtpResponse> => {
    try {
      const response = await apiClient<{ token: string }>(
        "/auth/verify-password",
        {
          method: "POST",
          data: payload,
        },
      );

      return {
        ok: true,
        token: response.token,
      };
    } catch (error) {
      return {
        ok: false,
        message: error instanceof Error ? error.message : "Invalid code",
      };
    }
  },

  /**
   * Resend code
   */
  resendCode: async (
    payload: ResendCodePayload,
  ): Promise<ResendOtpResponse> => {
    try {
      await apiClient<void>(API_ENDPOINTS.AUTH.RESEND_OTP, {
        method: "POST",
        data: payload,
      });

      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        message: error instanceof Error ? error.message : "Code resend failed",
      };
    }
  },

  /**
   * Verify account with code (for registration)
   */
  verifyAccount: async (payload: VerifyPayload): Promise<VerifyOtpResponse> => {
    try {
      await apiClient<void>(API_ENDPOINTS.AUTH.VERIFY_EMAIL, {
        method: "POST",
        data: {
          email: payload.email,
          code: payload.codeId,
          type: "account",
        },
      });

      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        message: error instanceof Error ? error.message : "Verification failed",
      };
    }
  },

  /**
   * Send reset password code
   */
  sendResetPassCode: async (email: string): Promise<SendResetResponse> => {
    try {
      await apiClient<void>("/auth/send-reset-password", {
        method: "POST",
        data: { email },
      });

      return {
        ok: true,
        redirectTo: "/otp",
      };
    } catch (error: unknown) {
      return {
        ok: false,
        redirectTo: "",
        message:
          error instanceof Error ? error.message : "Failed to send reset code",
      };
    }
  },

  /**
   * Login user
   */
  login: async (payload: LoginPayload): Promise<LoginResponse> => {
    try {
      const response = await apiClient<AuthResponse>(API_ENDPOINTS.AUTH.LOGIN, {
        method: "POST",
        data: {
          username: payload.username,
          password: payload.password,
        },
      });

      return {
        ok: true,
        redirectTo: "/",
        user: response.user,
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
      };
    } catch (error) {
      return {
        ok: false,
        redirectTo: "",
        message: error instanceof Error ? error.message : "Login failed",
      };
    }
  },

  /**
   * Logout user
   */
  logout: async (refreshToken: string): Promise<LogoutResponse> => {
    try {
      await apiClient<void>(API_ENDPOINTS.AUTH.LOGOUT, {
        method: "POST",
        data: { refreshToken },
      });
      return { ok: true };
    } catch (error) {
      return {
        ok: false,
        message: error instanceof Error ? error.message : "Logout failed",
      };
    }
  },
};
