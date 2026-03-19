export type RegisterPayload = {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    phone?: string;
    address?: string;
    gender?: string;
    date_of_birth?: string;
};

export type LoginPayload = {
    account: string;
    password: string;
};

export type ResetPayload = {
    token: string;
    newPassword: string;
};

export type VerifyPayload = {
    email: string;
    codeId: string;
};

export type ResendCodePayload = {
    email: string;
};

export type CheckValidCodePayload = {
    email: string;
    code: string;
};
