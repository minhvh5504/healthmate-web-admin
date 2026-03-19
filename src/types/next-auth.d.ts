import type { DefaultSession } from "next-auth";

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      phone?: string | null;
      role?: string | null;
      accessToken?: string;
      refreshToken?: string;
    };
    // Main tokens at session level (from your current setup)
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpires?: number;
    error?: string | null;
  }

  interface User {
    id: string;
    name?: string;
    email?: string;
    image?: string;
    phone?: string;
    role?: string | null;
    accessToken?: string;
    refreshToken?: string;
  }
}

// Add JWT types here (already in your route.ts but good to have centralized)
declare module 'next-auth/jwt' {
  interface JWT {
    id?: string;
    phone?: string;
    name?: string;
    role?: string | null;
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpires?: number;
    error?: string | null;
  }
}
