// context/AuthContext.tsx

import React, {
    createContext,
    useContext,
    useEffect,
    useState,
    useCallback,
    useMemo,
} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { authService } from '../services/authService';

import type {
    User,
    LoginPayload,
    RegisterPayload,
} from '../types';

const TOKEN_KEY = '@hobbyspace:token';
const REFRESH_KEY = '@hobbyspace:refreshToken';
const USER_KEY = '@hobbyspace:user';

interface AuthContextData {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;

    login: (payload: LoginPayload) => Promise<void>;

    register: (payload: RegisterPayload) => Promise<void>;

    logout: () => Promise<void>;

    refreshUser: () => Promise<void>;
}

const AuthContext =
    createContext<AuthContextData | undefined>(undefined);

export function AuthProvider({
    children
}: {
    children: React.ReactNode
}) {

    const [user, setUser] =
        useState<User | null>(null);

    const [isLoading, setIsLoading] =
        useState(true);

    // LIMPA STORAGE
    const clearAuthStorage = async () => {

        try {

            await AsyncStorage.removeItem(TOKEN_KEY);

            await AsyncStorage.removeItem(REFRESH_KEY);

            await AsyncStorage.removeItem(USER_KEY);

        } catch (error) {

            console.log(
                'Erro ao limpar storage:',
                error
            );

        }

    };

    // ── Verifica sessão ao abrir app ─────────────────────
    const checkAuth = useCallback(async () => {

        setIsLoading(true);

        try {

            // valida token via backend
            const fresh =
                await authService.getProfile();

            setUser(fresh);

        } catch {

            // token inválido
            setUser(null);

            await clearAuthStorage();

        } finally {

            setIsLoading(false);

        }

    }, []);

    useEffect(() => {

        checkAuth();

    }, [checkAuth]);

    // ── LOGIN ────────────────────────────────────────────
    const login = useCallback(async (
        payload: LoginPayload
    ) => {

        setIsLoading(true);

        try {

            const response =
                await authService.login(payload);

            setUser(response.user);

        } finally {

            setIsLoading(false);

        }

    }, []);

    // ── REGISTER ─────────────────────────────────────────
    const register = useCallback(async (
        payload: RegisterPayload
    ) => {

        setIsLoading(true);

        try {

            const response =
                await authService.register(payload);

            setUser(response.user);

        } finally {

            setIsLoading(false);

        }

    }, []);

    // ── LOGOUT ───────────────────────────────────────────
    const logout = useCallback(async () => {

        console.log('INICIO LOGOUT');

        setUser(null);

        try {

            await AsyncStorage.removeItem(TOKEN_KEY);

            await AsyncStorage.removeItem(REFRESH_KEY);

            await AsyncStorage.removeItem(USER_KEY);

            console.log('STORAGE LIMPO');

        } catch (error) {

            console.log('ERRO STORAGE:', error);

        }

    }, []);

    // ── REFRESH USER ─────────────────────────────────────
    const refreshUser = useCallback(async () => {

        try {

            const fresh =
                await authService.getProfile();

            setUser(fresh);

        } catch {

            // token expirou
            await clearAuthStorage();

            setUser(null);

        }

    }, []);

    const value = useMemo(() => ({

        user,

        isAuthenticated: !!user,

        isLoading,

        login,

        register,

        logout,

        refreshUser,

    }), [
        user,
        isLoading,
        login,
        register,
        logout,
        refreshUser,
    ]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {

    const ctx = useContext(AuthContext);

    if (!ctx) {

        throw new Error(
            'useAuth deve ser usado dentro de <AuthProvider>'
        );

    }

    return ctx;
}