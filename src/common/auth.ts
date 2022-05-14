import { createContext } from "react";

export interface AuthInterface {
    user: any | null;
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
