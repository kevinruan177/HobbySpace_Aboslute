import { useState, useEffect, useCallback } from 'react';
import { hobbyService } from '../services/hobbyService';
import type { Hobby } from '../types';

// ============================================================
// useMyHobbies — lista os hobbies do usuário logado
// ============================================================
export function useMyHobbies() {
    const [hobbies, setHobbies] = useState<Hobby[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const load = useCallback(async () => {
        let isMounted = true;
        setIsLoading(true);
        setError(null);
        try {
            const data = await hobbyService.getMyHobbies();
            if (isMounted) {
                setHobbies(Array.isArray(data) ? data : []);
            }
        } catch (err) {
            if (isMounted) {
                setError('Não foi possível carregar seus hobbies.');
                console.error('Erro ao carregar meus hobbies:', err);
            }
        } finally {
            if (isMounted) {
                setIsLoading(false);
            }
        }
        return () => {
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        void load();
    }, [load]);

    return { hobbies, isLoading, error, refresh: load };
}

// ============================================================
// useDiscoverHobbies — hobbies para descobrir com busca
// ============================================================
export function useDiscoverHobbies(search = '') {
    const [hobbies, setHobbies] = useState<Hobby[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const load = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        let isMounted = true;
        try {
            const response = await hobbyService.discover(1, search);
            if (isMounted) {
                setHobbies(response.data || []);
            }
        } catch (err) {
            if (isMounted) {
                setError('Não foi possível buscar hobbies.');
                console.error('Erro ao buscar hobbies:', err);
            }
        } finally {
            if (isMounted) {
                setIsLoading(false);
            }
        }
        return () => {
            isMounted = false;
        };
    }, [search]);

    useEffect(() => {
        void load();
    }, [load]);

    return { hobbies, isLoading, error, refresh: load };
}
