export interface User {
    id: string;
    email: string;
    fullName: string;
    role: string;
    emailVerified?: boolean;
    isActive?: boolean;
}
