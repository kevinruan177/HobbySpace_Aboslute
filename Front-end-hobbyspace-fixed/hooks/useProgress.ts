import { useState, useEffect, useCallback } from 'react';
import { progressService } from '../services/progressService';
import type { CommunityProgress } from '../types';

export function useMyProgress() {
    const [progresses, setProgresses] = useState<CommunityProgress[]>([]);
    const [isLoading, setIsLoading]   = useState(true);
    const [error, setError]           = useState<string | null>(null);

    const load = useCallback(async () => {
        setIsLoading(true); setError(null);
        try {
            const data = await progressService.getMyProgress();
            setProgresses(Array.isArray(data) ? data : []);
        } catch (err) {
            setError('Não foi possível carregar o progresso.');
            console.error(err);
        } finally { setIsLoading(false); }
    }, []);

    useEffect(() => { void load(); }, [load]);
    return { progresses, isLoading, error, refresh: load };
}

export function useCommunityProgress(slug: string) {
    const [progress, setProgress] = useState<CommunityProgress | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const load = useCallback(async () => {
        if (!slug?.trim()) return;
        setIsLoading(true);
        try {
            const data = await progressService.getProgressByCommunity(slug);
            setProgress(data);
        } catch (_) {}
        finally { setIsLoading(false); }
    }, [slug]);

    useEffect(() => { void load(); }, [load]);
    return { progress, isLoading, refresh: load };
}
