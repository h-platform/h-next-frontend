import { createContext } from "react";

export interface JWTPayload {
    userId: number;
    displayName: string;
    mobileNumber: string;
    email: string;
    roles: string[];
    grants: Record<string, string[]>[];
  }

export interface AuthInterface {
    user: JWTPayload | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    setContext: (value: any) => void,
}

export const AuthContext = createContext<AuthInterface>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    setContext: () => {},
});
