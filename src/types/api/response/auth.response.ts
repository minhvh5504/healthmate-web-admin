import { User } from '@/types/entities/user.entity';

export type { User } from '@/types/entities/user.entity';
export type { TokenData } from '@/types/entities/token.entity';

export type AuthResponse = {
    user: User;
    accessToken: string;
    refreshToken: string;
};

// Aliases for compatibility
export type UserData = User;

export type RegisterResponse = {
    ok: boolean;
    redirectTo: string;
    message?: string;
    user?: User;
};

export type LoginResponse = {
    ok: boolean;
    redirectTo: string;
    message?: string;
    user?: User;
    accessToken?: string;
    refreshToken?: string;
};

export type ResetResponse = { ok: boolean; message?: string };
export type SendResetResponse = { ok: boolean; redirectTo: string; message?: string };
export type VerifyOtpResponse = { ok: boolean; message?: string; token?: string };
export type ResendOtpResponse = { ok: boolean; message?: string };
