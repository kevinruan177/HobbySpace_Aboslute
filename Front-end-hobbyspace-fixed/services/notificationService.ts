import { api } from './api';
import type { Notification, NotificationCategory, PaginatedResponse } from '../types';

// ============================================================
// NOTIFICATION SERVICE
// ============================================================
export const notificationService = {

    // ---------- LISTAR NOTIFICAÇÕES ----------
    getAll: async (category?: NotificationCategory, page = 1): Promise<PaginatedResponse<Notification>> => {
        try {
            const params = new URLSearchParams({ page: String(page) });
            if (category && category !== 'Todas') params.append('category', category);
            const response = await api.get<PaginatedResponse<Notification>>(`/notifications?${params}`);
            return response || { data: [], total: 0, page: 1, limit: 10 };
        } catch (error) {
            console.error('Erro ao buscar notificações:', error);
            throw error;
        }
    },

    // ---------- MARCAR UMA COMO LIDA ----------
    markAsRead: async (notificationId: string): Promise<void> => {
        if (!notificationId?.trim()) {
            throw new Error('ID de notificação inválido');
        }
        try {
            await api.patch<void>(`/notifications/${notificationId}/read`, {});
        } catch (error) {
            console.error('Erro ao marcar notificação como lida:', error);
            throw error;
        }
    },

    // ---------- MARCAR TODAS COMO LIDAS ----------
    markAllAsRead: async (): Promise<void> => {
        try {
            await api.patch<void>('/notifications/read-all', {});
        } catch (error) {
            console.error('Erro ao marcar todas como lidas:', error);
            throw error;
        }
    },

    // ---------- CONTAR NÃO LIDAS ----------
    getUnreadCount: async (): Promise<{ count: number }> => {
        try {
            const response = await api.get<{ count: number }>('/notifications/unread-count');
            return response || { count: 0 };
        } catch (error) {
            console.error('Erro ao contar notificações não lidas:', error);
            throw error;
        }
    },
};