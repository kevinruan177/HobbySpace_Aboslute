import { api } from './api';
import type { CommunityProgress, XpEvent } from '../types';

export const progressService = {
    getMyProgress: (): Promise<CommunityProgress[]> =>
        api.get<CommunityProgress[]>('/progress/me'),

    getProgressByCommunity: (slug: string): Promise<CommunityProgress> =>
        api.get<CommunityProgress>(`/progress/${slug}`),

    getXpEvents: (communitySlug?: string): Promise<XpEvent[]> => {
        const q = communitySlug ? `?communitySlug=${communitySlug}` : '';
        return api.get<XpEvent[]>(`/xp/events${q}`);
    },
};
