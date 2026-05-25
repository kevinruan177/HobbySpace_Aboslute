import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL, api } from './api';
import type { AuthResponse, LoginPayload, RegisterPayload, User } from '../types';

const TOKEN_KEY = '@hobbyspace:token';
const REFRESH_KEY = '@hobbyspace:refreshToken';
const USER_KEY = '@hobbyspace:user';

function normalizeAuthResponse(response: any): AuthResponse {
    const accessToken =
        response?.tokens?.accessToken ??
        response?.accessToken ??
        response?.token ??
        response?.jwt;

    const refreshToken = response?.tokens?.refreshToken ?? response?.refreshToken;
    const user = response?.user ?? response?.data?.user;

    if (!user || !accessToken) {
        throw new Error('Resposta inválida do servidor de autenticação');
    }

    return {
        user,
        tokens: {
            accessToken,
            refreshToken,
        },
    };
}

// ============================================================
// AUTH SERVICE
// ============================================================
export const authService = {

    // ---------- LOGIN ----------
    login: async (payload: LoginPayload): Promise<AuthResponse> => {
        const apiResponse = await api.post<AuthResponse>('/auth/login', payload);
        const response = normalizeAuthResponse(apiResponse);
        await authService.saveSession(response);
        return response;
    },

    // ---------- REGISTER ----------
    register: async (payload: RegisterPayload): Promise<AuthResponse> => {
        const apiResponse = await api.post<AuthResponse>('/auth/register', payload);
        const response = normalizeAuthResponse(apiResponse);
        await authService.saveSession(response);
        return response;
    },

    // ---------- LOGOUT ----------
    logout: async (): Promise<void> => {
        try {
            // Avisa o backend (opcional — ignora erro se falhar)
            await api.post('/auth/logout', {}).catch(() => {});
        } finally {
            await Promise.all([
                AsyncStorage.removeItem(TOKEN_KEY),
                AsyncStorage.removeItem(REFRESH_KEY),
                AsyncStorage.removeItem(USER_KEY),
            ]);
        }
    },

    // ---------- PERFIL LOGADO ----------
    getProfile: async (): Promise<User> => {
        return api.get<User>('/auth/me');
    },

    // ---------- SALVAR SESSÃO ----------
    saveSession: async (response: AuthResponse): Promise<void> => {
        await AsyncStorage.setItem(TOKEN_KEY, response.tokens.accessToken);
        if (response.tokens.refreshToken) {
            await AsyncStorage.setItem(REFRESH_KEY, response.tokens.refreshToken);
        }
        await AsyncStorage.setItem(USER_KEY, JSON.stringify(response.user));
    },

    // ---------- RECUPERAR USUÁRIO SALVO ----------
    getStoredUser: async (): Promise<User | null> => {
        try {
            const raw = await AsyncStorage.getItem(USER_KEY);
            if (!raw) return null;
            return JSON.parse(raw);
        } catch (error) {
            console.error('Erro ao recuperar usuário:', error);
            // Se houver erro de parsing, limpa o armazenamento
            await AsyncStorage.removeItem(USER_KEY);
            return null;
        }
    },

    // ---------- CHECAR SE ESTÁ LOGADO ----------
    isAuthenticated: async (): Promise<boolean> => {
        const token = await AsyncStorage.getItem(TOKEN_KEY);
        return !!token;
    },
};
