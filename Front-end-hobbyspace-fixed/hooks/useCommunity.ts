import { useState, useEffect, useCallback } from 'react';
import { communityService } from '../services/communityService';
import type { Community } from '../types';

export function useCommunities() {
    const [communities, setCommunities] = useState<Community[]>([]);
    const [isLoading, setIsLoading]     = useState(true);
    const [error, setError]             = useState<string | null>(null);

    const load = useCallback(async () => {
        setIsLoading(true); setError(null);
        try {
            const data = await communityService.list();
            setCommunities(Array.isArray(data) ? data : []);
        } catch (err) {
            setError('Não foi possível carregar as comunidades.');
            console.error(err);
        } finally { setIsLoading(false); }
    }, []);

    useEffect(() => { void load(); }, [load]);
    return { communities, isLoading, error, refresh: load };
}

export function useCommunityDetail(slug: string) {
    const [community, setCommunity] = useState<Community | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError]         = useState<string | null>(null);

    const load = useCallback(async () => {
        if (!slug?.trim()) return;
        setIsLoading(true); setError(null);
        try {
            const data = await communityService.getBySlug(slug);
            setCommunity(data);
        } catch (err) {
            setError('Comunidade não encontrada.');
            console.error(err);
        } finally { setIsLoading(false); }
    }, [slug]);

    useEffect(() => { void load(); }, [load]);

    const toggleMembership = async (isMember: boolean) => {
        try {
            if (isMember) await communityService.leave(slug);
            else          await communityService.join(slug);
            await load();
        } catch (err) {
            console.error('Erro ao atualizar membro:', err);
            throw err;
        }
    };

    return { community, isLoading, error, refresh: load, toggleMembership };
}
