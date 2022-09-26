export interface User {
    id: number;
    name: string;
    email: string;
    type: "doctor" | "patient";
    iat?: string;
    eat?: string;
}

export interface AuthData {
    user: User,
    accessToken: string,
    refreshToken: string 
}

export interface SignupRequest {
    name: string,
    email: string,
    password: string
}

export interface SigninRequest {
    email: string,
    password: string
}

export interface PasswordResetRequest {
    type: string;
    email: string;
}

export interface PerformPasswordResetRequest {
    secret: string;
    type: string;
    newPassword: string;
}