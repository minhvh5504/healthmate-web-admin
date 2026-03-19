'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/auth-service';

export function useNextAuth() {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const queryClient = useQueryClient();

  const isAuthenticated = status === 'authenticated';
  const isLoading = status === 'loading';
  const user = session?.user;

  // Login with phone and password
  const login = async (
    username: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const result = await signIn('credentials', {
        redirect: false,
        username,
        password,
      });

      if (result?.error) {
        return { success: false, error: result.error };
      }

      if (result?.ok) {
        return { success: true };
      }

      return { success: false, error: 'Unknown error occurred' };
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'An error occurred during login',
      };
    }
  };

  // Logout
  const logout = async () => {
    try {
      await authService.logout();
    } catch (e) {
      console.error('Logout error:', e);
    }
    await signOut({ redirect: false });
    queryClient.clear(); // remove cached user-specific data
    router.push('/login');
  };

  // Register
  const register = async (userData: any): Promise<{ success: boolean; redirectTo?: string; error?: string }> => {
    try {
      const result = await authService.register({
        username: userData.username,
        email: userData.email,
        password: userData.password,
        confirmPassword: userData.confirmPassword,
      });

      if (!result.ok) {
        return {
          success: false,
          error: result.message || 'Registration failed',
        };
      }

      return {
        success: true,
        redirectTo: result.redirectTo || '/otp',
      };
    } catch (error) {
      console.error('Registration error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'An error occurred during registration',
      };
    }
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    register,
    updateSession: update,
  };
}
