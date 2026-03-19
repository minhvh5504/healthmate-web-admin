import type { NextAuthOptions, User } from 'next-auth';
import type { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';
import { API_BASE_URL } from '@/constants/api';
import axios from 'axios';

/**
 * Helper to refresh access token using backend refresh-token endpoint
 */
async function refreshAccessToken(token: JWT): Promise<JWT> {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/admin/refresh-token`, {
            userId: token.id,
            refreshToken: token.refreshToken,
        });

        const refreshedTokens = response.data.data || response.data;

        if (response.status !== 200) {
            throw refreshedTokens;
        }

        return {
            ...token,
            accessToken: refreshedTokens.accessToken,
            refreshToken: refreshedTokens.refreshToken ?? token.refreshToken, // Fall back to old refresh token
        };
    } catch (error) {
        console.error('RefreshAccessTokenError', error);

        return {
            ...token,
            error: 'RefreshAccessTokenError',
        };
    }
}

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: 'Username', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials: any): Promise<any> {
                if (!credentials?.username || !credentials?.password) return null;

                try {
                    const response = await axios.post(`${API_BASE_URL}/auth/admin/login`, {
                        account: credentials.username,
                        password: credentials.password,
                    });

                    const data = response.data;
                    const authData = data.data || data;

                    if (authData && authData.accessToken) {
                        return {
                            id: authData.user._id,
                            name: authData.user.username,
                            email: authData.user.email,
                            role: authData.user.role,
                            accessToken: authData.accessToken,
                            refreshToken: authData.refreshToken,
                        };
                    }
                    return null;
                } catch (error: any) {
                    const message = error.response?.data?.message || 'Login failed';
                    throw new Error(message);
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user, trigger, session }: { token: JWT, user?: User | any, trigger?: string, session?: any }): Promise<JWT> {
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
            if (trigger === 'update' && session) {
                return { ...token, ...session };
            }

            // If we had expiry info, we could call refreshAccessToken(token) here.
            // But since backend doesn't return expiry in AuthResponse directly, 
            // we'll rely on the client-side interceptor to trigger refresh if needed,
            // or we can just return the token.

            return token;
        },
        async session({ session, token }: { session: any, token: JWT }): Promise<any> {
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
        signIn: '/login',
    },
    session: {
        strategy: 'jwt',
        maxAge: 7 * 24 * 60 * 60, // 7 days
    },
};
