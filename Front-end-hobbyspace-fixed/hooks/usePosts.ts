import { useState, useEffect, useCallback } from 'react';
import { postService } from '../services/postService';
import type { Post, Comment } from '../types';

// ============================================================
// useCommunityPosts — posts de uma comunidade
// ============================================================
export function useCommunityPosts(communitySlug: string) {
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const load = useCallback(async () => {
        if (!communitySlug?.trim()) return;
        
        let isMounted = true;
        setIsLoading(true);
        setError(null);
        try {
            const response = await postService.getByCommunity(communitySlug);
            if (isMounted) {
                setPosts(response?.data || []);
            }
        } catch (err) {
            if (isMounted) {
                setError('Não foi possível carregar os posts.');
                console.error('Erro ao carregar posts:', err);
            }
        } finally {
            if (isMounted) {
                setIsLoading(false);
            }
        }
        return () => {
            isMounted = false;
        };
    }, [communitySlug]);

    useEffect(() => {
        void load();
    }, [load]);

    const toggleLike = async (postId: string) => {
        const post = posts.find(p => p?.id === postId);
        if (!post) return;

        const previousPosts = posts;
        // Atualização otimista
        setPosts(prev => prev.map(p =>
            p?.id === postId
                ? { ...p, isLiked: !p.isLiked, likesCount: p.isLiked ? p.likesCount - 1 : p.likesCount + 1 }
                : p
        ));

        try {
            if (post.isLiked) {
                await postService.unlike(postId);
            } else {
                await postService.like(postId);
            }
        } catch (error) {
            // Reverte se falhar
            setPosts(previousPosts);
            console.error('Erro ao atualizar like:', error);
        }
    };

    return { posts, isLoading, error, refresh: load, toggleLike };
}

// ============================================================
// usePostDetails — detalhes + comentários de um post
// ============================================================
export function usePostDetails(postId: string) {
    const [post, setPost] = useState<Post | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSending, setIsSending] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const load = useCallback(async () => {
        if (!postId?.trim()) return;
        
        let isMounted = true;
        setIsLoading(true);
        setError(null);
        try {
            const [postData, commentsData] = await Promise.all([
                postService.getById(postId),
                postService.getComments(postId),
            ]);
            if (isMounted) {
                setPost(postData);
                setComments(Array.isArray(commentsData) ? commentsData : []);
            }
        } catch (err) {
            if (isMounted) {
                setError('Não foi possível carregar o post.');
                console.error('Erro ao carregar post:', err);
            }
        } finally {
            if (isMounted) {
                setIsLoading(false);
            }
        }
        return () => {
            isMounted = false;
        };
    }, [postId]);

    useEffect(() => {
        void load();
    }, [load]);

    const sendComment = async (text: string) => {
        if (!text?.trim() || isSending || !postId) return;
        setIsSending(true);
        try {
            const newComment = await postService.comment(postId, text.trim());
            setComments(prev => [...prev, newComment]);
        } catch (error) {
            console.error('Erro ao enviar comentário:', error);
            throw error;
        } finally {
            setIsSending(false);
        }
    };

    return { post, comments, isLoading, isSending, error, sendComment, refresh: load };
}
