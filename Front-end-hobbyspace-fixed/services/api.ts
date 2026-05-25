import AsyncStorage from '@react-native-async-storage/async-storage';

// ============================================================
// CONFIGURAÇÃO BASE DA API
// Em desenvolvimento local: http://localhost:3000/api
// Em produção: troque pela URL do servidor/deploy
// ============================================================

// Para testar no dispositivo físico, use o IP da sua máquina:
// Ex: 'http://192.168.1.10:3000/api'
// Para emulador Android: 'http://10.0.2.2:3000/api'
// Para simulador iOS / web: 'http://localhost:3000/api'
export const BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api';

// ============================================================
// CLIENTE HTTP
// ============================================================
async function request<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    try {
        const token = await AsyncStorage.getItem('@hobbyspace:token');

        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            ...(options.headers as Record<string, string>),
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        // Adiciona timeout de 30 segundos
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 30000);

        try {
            const response = await fetch(`${BASE_URL}${endpoint}`, {
                ...options,
                headers,
                signal: controller.signal,
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new ApiError(response.status, errorData.message || 'Erro na requisição');
            }

            if (response.status === 204) {
                return {} as T;
            }

            return response.json();
        } finally {
            clearTimeout(timeout);
        }
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        if (error instanceof Error && error.name === 'AbortError') {
            throw new ApiError(408, 'Requisição expirou. Tente novamente.');
        }
        throw error;
    }
}

// ============================================================
// CLASSE DE ERRO CUSTOMIZADA
// ============================================================
export class ApiError extends Error {
    constructor(
        public status: number,
        message: string
    ) {
        super(message);
        this.name = 'ApiError';
    }
}

// ============================================================
// MÉTODOS EXPORTADOS
// ============================================================
export const api = {
    get: <T>(endpoint: string) =>
        request<T>(endpoint, { method: 'GET' }),

    post: <T>(endpoint: string, body: unknown) =>
        request<T>(endpoint, {
            method: 'POST',
            body: JSON.stringify(body),
        }),

    put: <T>(endpoint: string, body: unknown) =>
        request<T>(endpoint, {
            method: 'PUT',
            body: JSON.stringify(body),
        }),

    patch: <T>(endpoint: string, body: unknown) =>
        request<T>(endpoint, {
            method: 'PATCH',
            body: JSON.stringify(body),
        }),

    delete: <T>(endpoint: string) =>
        request<T>(endpoint, { method: 'DELETE' }),
};
