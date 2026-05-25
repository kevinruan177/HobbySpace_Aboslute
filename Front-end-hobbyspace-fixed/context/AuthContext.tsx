import React, {
    createContext,
    useContext,
    useEffect,
    useState,
    useCallback,
} from 'react';

import { authService } from '../services/authService';
import type { User, LoginPayload, RegisterPayload } from '../types';

// ============================================================
// TYPES DO CONTEXT
// ============================================================
interface AuthContextData {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (payload: LoginPayload) => Promise<void>;
    register: (payload: RegisterPayload) => Promise<void>;
    logout: () => Promise<void>;
    refreshUser: () => Promise<void>;
}

// ============================================================
// CONTEXT
// ============================================================
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// ============================================================
// PROVIDER
// ============================================================
export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Restaura sessão ao abrir o app
    useEffect(() => {
        let isMounted = true;
        (async () => {
            try {
                const storedUser = await authService.getStoredUser();
                if (isMounted) {
                    if (storedUser) {
                        setUser(storedUser);
                    }
                }
            } catch (error) {
                console.error('Erro ao restaurar sessão:', error);
                if (isMounted) {
                    setUser(null);
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        })();
        return () => {
            isMounted = false;
        };
    }, []);

    const login = useCallback(async (payload: LoginPayload) => {
        const response = await authService.login(payload);
        setUser(response.user);
    }, []);

    const register = useCallback(async (payload: RegisterPayload) => {
        const response = await authService.register(payload);
        setUser(response.user);
    }, []);

    const logout = useCallback(async () => {
        await authService.logout();
        setUser(null);
    }, []);

    const refreshUser = useCallback(async () => {
        const fresh = await authService.getProfile();
        setUser(fresh);
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                isLoading,
                login,
                register,
                logout,
                refreshUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

// ============================================================
// HOOK DE ATALHO
// ============================================================
export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth deve ser usado dentro de <AuthProvider>');
    return ctx;
}