import { api } from './api';
import type {
    Post,
    Comment,
    Community,
    CreatePostPayload,
    PaginatedResponse,
} from '../types';

// ============================================================
// POST SERVICE
// ============================================================
export const postService = {

    // ---------- POSTS DE UMA COMUNIDADE ----------
    getByCommunity: (slug: string, page = 1): Promise<PaginatedResponse<Post>> =>
        api.get<PaginatedResponse<Post>>(`/communities/${slug}/posts?page=${page}`),

    // ---------- DETALHES DE UM POST ----------
    getById: (postId: string): Promise<Post> =>
        api.get<Post>(`/posts/${postId}`),

    // ---------- CRIAR POST ----------
    create: (payload: CreatePostPayload): Promise<Post> =>
        api.post<Post>('/posts', payload),

    // ---------- CURTIR POST ----------
    like: (postId: string): Promise<void> =>
        api.post<void>(`/posts/${postId}/like`, {}),

    // ---------- DESCURTIR POST ----------
    unlike: (postId: string): Promise<void> =>
        api.delete<void>(`/posts/${postId}/like`),

    // ---------- SALVAR POST ----------
    save: (postId: string): Promise<void> =>
        api.post<void>(`/posts/${postId}/save`, {}),

    // ---------- REMOVER SALVO ----------
    unsave: (postId: string): Promise<void> =>
        api.delete<void>(`/posts/${postId}/save`),

    // ---------- COMENTÁRIOS ----------
    getComments: (postId: string): Promise<Comment[]> =>
        api.get<Comment[]>(`/posts/${postId}/comments`),

    // ---------- COMENTAR ----------
    comment: (postId: string, text: string): Promise<Comment> =>
        api.post<Comment>(`/posts/${postId}/comments`, { text }),
};

// ============================================================
// COMMUNITY SERVICE
// ============================================================
export const communityService = {

    // ---------- DETALHES DE UMA COMUNIDADE ----------
    getBySlug: (slug: string): Promise<Community> =>
        api.get<Community>(`/communities/${slug}`),

    // ---------- LISTAR TODAS ----------
    list: (): Promise<Community[]> =>
        api.get<Community[]>('/communities'),
};