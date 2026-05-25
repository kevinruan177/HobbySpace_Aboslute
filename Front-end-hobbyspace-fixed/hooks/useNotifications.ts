import { useState, useEffect, useCallback } from 'react';
import { notificationService } from '../services/notificationService';
import type { Notification, NotificationCategory } from '../types';

// ============================================================
// useNotifications
// ============================================================
export function useNotifications(category: NotificationCategory = 'Todas') {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const load = useCallback(async () => {
        let isMounted = true;
        setIsLoading(true);
        setError(null);
        try {
            const response = await notificationService.getAll(category);
            if (isMounted) {
                setNotifications(response.data || []);
            }
        } catch (err) {
            if (isMounted) {
                setError('Não foi possível carregar as notificações.');
                console.error('Erro ao carregar notificações:', err);
            }
        } finally {
            if (isMounted) {
                setIsLoading(false);
            }
        }
        return () => {
            isMounted = false;
        };
    }, [category]);

    useEffect(() => {
        void load();
    }, [load]);

    const markAllAsRead = async () => {
        try {
            await notificationService.markAllAsRead();
            setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
        } catch (error) {
            console.error('Erro ao marcar notificações como lidas:', error);
        }
    };

    return { notifications, isLoading, error, refresh: load, markAllAsRead };
}
