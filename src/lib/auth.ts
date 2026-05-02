import type { NextAuthOptions, User, Session } from "next-auth";
import type { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import { API_BASE_URL } from "@/constants/api";
import axios from "axios";

/**
 * Helper to refresh access token using backend refresh-token endpoint
 */
export async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    const response = await axios.post(`${API_BASE_URL}/admin/auth/refresh`, {
      refreshToken: token.refreshToken,
    });

    const refreshedTokens = response.data.data || response.data;

    if (response.status !== 200) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.accessToken,
      refreshToken: refreshedTokens.refreshToken ?? token.refreshToken,
    };
  } catch (error) {
    console.error("RefreshAccessTokenError", error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<User | null> {
        if (!credentials?.username || !credentials?.password) return null;

        try {
          const response = await axios.post(
            `${API_BASE_URL}/admin/auth/login`,
            {
              email: credentials.username,
              password: credentials.password,
            },
          );

          const data = response.data;
          const authData = data.data || data;

          if (authData && authData.accessToken) {
            return {
              id: authData.user.id,
              name: authData.user.fullName,
              email: authData.user.email,
              role: authData.user.role,
              accessToken: authData.accessToken,
              refreshToken: authData.refreshToken,
            };
          }
          return null;
        } catch (error) {
          if (axios.isAxiosError(error)) {
            const message = error.response?.data?.message || "Login failed";
            throw new Error(message);
          }
          throw error;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({
      token,
      user,
      trigger,
      session,
    }: {
      token: JWT;
      user?: User;
      trigger?: "signIn" | "signUp" | "update";
      session?: Partial<JWT>;
    }): Promise<JWT> {
      // Initial sign in
      if (user) {
        return {
          ...token,
          id: user.id,
          role: user.role,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
        };
      }

      // Handle session update
      if (trigger === "update" && session) {
        return { ...token, ...session };
      }

      return token;
    },
    async session({
      session,
      token,
    }: {
      session: Session;
      token: JWT;
    }): Promise<Session> {
      if (token) {
        session.user = {
          ...session.user,
          id: token.id as string,
          role: token.role as string,
        };
        session.accessToken = token.accessToken as string;
        session.refreshToken = token.refreshToken as string;
        session.error = token.error as string | null;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
};
