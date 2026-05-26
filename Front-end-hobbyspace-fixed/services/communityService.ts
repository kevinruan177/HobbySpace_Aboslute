import { api } from './api';
import type { Community, PaginatedResponse, Post } from '../types';

export const communityService = {
    list: (): Promise<Community[]> =>
        api.get<Community[]>('/communities'),

    getBySlug: (slug: string): Promise<Community> =>
        api.get<Community>(`/communities/${slug}`),

    join: (slug: string): Promise<{ message: string }> =>
        api.post<{ message: string }>(`/communities/${slug}/join`, {}),

    leave: (slug: string): Promise<void> =>
        api.delete<void>(`/communities/${slug}/leave`),

    getPosts: (slug: string, page = 1): Promise<PaginatedResponse<Post>> =>
        api.get<PaginatedResponse<Post>>(`/communities/${slug}/posts?page=${page}`),
};
