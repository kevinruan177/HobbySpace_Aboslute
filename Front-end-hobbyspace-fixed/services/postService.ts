import { api } from './api';
import type {
    Post, Comment, CreatePostPayload, PaginatedResponse,
} from '../types';

export const postService = {
    getByCommunity: (slug: string, page = 1): Promise<PaginatedResponse<Post>> =>
        api.get<PaginatedResponse<Post>>(`/communities/${slug}/posts?page=${page}`),

    getById: (postId: string): Promise<Post> =>
        api.get<Post>(`/posts/${postId}`),

    create: (payload: CreatePostPayload): Promise<Post> =>
        api.post<Post>('/posts', payload),

    like: (postId: string): Promise<void> =>
        api.post<void>(`/posts/${postId}/like`, {}),

    unlike: (postId: string): Promise<void> =>
        api.delete<void>(`/posts/${postId}/like`),

    save: (postId: string): Promise<void> =>
        api.post<void>(`/posts/${postId}/save`, {}),

    unsave: (postId: string): Promise<void> =>
        api.delete<void>(`/posts/${postId}/save`),

    share: (postId: string): Promise<void> =>
        api.post<void>(`/posts/${postId}/share`, {}),

    getComments: (postId: string): Promise<Comment[]> =>
        api.get<Comment[]>(`/posts/${postId}/comments`),

    comment: (postId: string, text: string): Promise<Comment> =>
        api.post<Comment>(`/posts/${postId}/comments`, { text }),

    delete: (postId: string): Promise<void> =>
        api.delete<void>(`/posts/${postId}`),
};
