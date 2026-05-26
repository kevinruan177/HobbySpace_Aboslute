import AsyncStorage from '@react-native-async-storage/async-storage';

export const BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api';

const TOKEN_KEY   = '@hobbyspace:token';
const REFRESH_KEY = '@hobbyspace:refreshToken';
const USER_KEY    = '@hobbyspace:user';

// Callback global para forçar logout (injetado pelo AuthContext)
let _onForceLogout: (() => void) | null = null;
export function setForceLogoutCallback(cb: () => void) { _onForceLogout = cb; }

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    try {
        const token = await AsyncStorage.getItem(TOKEN_KEY);

        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            ...(options.headers as Record<string, string>),
        };
        if (token) headers['Authorization'] = `Bearer ${token}`;

        const controller = new AbortController();
        const timeout    = setTimeout(() => controller.abort(), 30000);

        try {
            const response = await fetch(`${BASE_URL}${endpoint}`, {
                ...options, headers, signal: controller.signal,
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));

                // Sessão inválida — limpa storage e força logout
                if (response.status === 401) {
                    const code = errorData.code || '';
                    if (code === 'USER_NOT_FOUND' || code === 'INVALID_TOKEN') {
                        await Promise.all([
                            AsyncStorage.removeItem(TOKEN_KEY),
                            AsyncStorage.removeItem(REFRESH_KEY),
                            AsyncStorage.removeItem(USER_KEY),
                        ]);
                        if (_onForceLogout) _onForceLogout();
                    }
                }

                throw new ApiError(response.status, errorData.message || 'Erro na requisição');
            }

            if (response.status === 204) return {} as T;
            return response.json();
        } finally {
            clearTimeout(timeout);
        }
    } catch (error) {
        if (error instanceof ApiError) throw error;
        if (error instanceof Error && error.name === 'AbortError')
            throw new ApiError(408, 'Requisição expirou. Tente novamente.');
        throw error;
    }
}

export class ApiError extends Error {
    constructor(public status: number, message: string) {
        super(message);
        this.name = 'ApiError';
    }
}

export const api = {
    get:    <T>(endpoint: string) => request<T>(endpoint, { method: 'GET' }),
    post:   <T>(endpoint: string, body: unknown) => request<T>(endpoint, { method: 'POST', body: JSON.stringify(body) }),
    put:    <T>(endpoint: string, body: unknown) => request<T>(endpoint, { method: 'PUT', body: JSON.stringify(body) }),
    patch:  <T>(endpoint: string, body: unknown) => request<T>(endpoint, { method: 'PATCH', body: JSON.stringify(body) }),
    delete: <T>(endpoint: string) => request<T>(endpoint, { method: 'DELETE' }),
};
