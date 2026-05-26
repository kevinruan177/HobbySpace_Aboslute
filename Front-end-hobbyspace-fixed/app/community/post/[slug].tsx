import React, { useState } from 'react';
import {
    View, Text, Image, ScrollView, TouchableOpacity,
    TextInput, ActivityIndicator, KeyboardAvoidingView,
    Platform, Alert, ImageBackground,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { AppHeader } from '../../../components/Header';
import { BottomBar } from '../../../components/BottomBar';
import { BadgeChip } from '../../../components/BadgeChip';
import { postStyles as styles } from '../../../styles/screens/postStyles';
import { usePostDetails } from '../../../hooks/usePosts';
import { postService } from '../../../services/postService';
import type { Comment } from '../../../types';

function timeAgo(dateStr: string) {
    const diff = (Date.now() - new Date(dateStr).getTime()) / 1000;
    if (diff < 60) return 'agora';
    if (diff < 3600) return `${Math.floor(diff / 60)}min`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
    return new Date(dateStr).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
}

function CommentCard({ comment }: { comment: Comment }) {
    return (
        <View style={styles.commentContainer}>
            {comment.user.avatarUrl ? (
                <Image source={{ uri: comment.user.avatarUrl }} style={styles.commentAvatar} />
            ) : (
                <Image source={require('../../../assets/perfilpadrao.png')} style={styles.commentAvatar} />
            )}
            <View style={styles.commentContent}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                    <Text style={styles.commentUser}>{comment.user.name}</Text>
                    <BadgeChip badge={comment.user.badge} size="sm" />
                </View>
                <Text style={styles.commentText}>{comment.text}</Text>
                <Text style={styles.commentTime}>{timeAgo(comment.createdAt)}</Text>
            </View>
        </View>
    );
}

export default function PostDetail() {
    const { slug: postId } = useLocalSearchParams<{ slug: string }>();
    const router = useRouter();
    const { post, comments, isLoading, isSending, error, sendComment, refresh } = usePostDetails(postId || '');
    const [commentText, setCommentText] = useState('');
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);

    React.useEffect(() => {
        if (post) { setIsLiked(post.isLiked); setLikeCount(post.likesCount); }
    }, [post]);

    const handleLike = async () => {
        if (!post) return;
        const next = !isLiked;
        setIsLiked(next);
        setLikeCount(c => c + (next ? 1 : -1));
        try {
            if (next) await postService.like(post.id);
            else      await postService.unlike(post.id);
        } catch { setIsLiked(!next); setLikeCount(c => c + (next ? -1 : 1)); }
    };

    const handleShare = async () => {
        if (!post) return;
        try { await postService.share(post.id); Alert.alert('Compartilhado! +15 XP 🎉'); }
        catch (_) {}
    };

    const handleSend = async () => {
        if (!commentText.trim()) return;
        try { await sendComment(commentText); setCommentText(''); }
        catch { Alert.alert('Erro', 'Não foi possível enviar o comentário.'); }
    };

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <AppHeader title="Post" variant="com-fundo" showBackButton showNotification={false} rightButton="none" />

            <ScrollView
                style={{ flex: 1, backgroundColor: '#F6F1F8' }}
                contentContainerStyle={{ paddingTop: 110, paddingBottom: 120 }}
                showsVerticalScrollIndicator={false}
            >
                {isLoading && <ActivityIndicator color="#5e17eb" style={{ marginTop: 40 }} />}
                {error && <Text style={{ color: '#999', textAlign: 'center', marginTop: 40 }}>{error}</Text>}

                {post && (
                    <View style={styles.postCard}>
                        {/* Autor */}
                        <View style={styles.postHeader}>
                            {post.user.avatarUrl ? (
                                <Image source={{ uri: post.user.avatarUrl }} style={styles.avatar} />
                            ) : (
                                <Image source={require('../../../assets/perfilpadrao.png')} style={styles.avatar} />
                            )}
                            <View style={{ flex: 1 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                                    <Text style={styles.authorName}>{post.user.name}</Text>
                                    <BadgeChip badge={post.user.badge} size="md" />
                                </View>
                                <Text style={styles.postTime}>{timeAgo(post.createdAt)}</Text>
                            </View>
                        </View>

                        <Text style={styles.postText}>{post.text}</Text>

                        {post.imageUrl && (
                            <ImageBackground
                                source={{ uri: post.imageUrl }}
                                style={{ width: '100%', height: 240, borderRadius: 12, overflow: 'hidden', marginBottom: 12 }}
                            />
                        )}

                        {/* Ações */}
                        <View style={styles.actions}>
                            <TouchableOpacity style={styles.action} onPress={handleLike}>
                                <Ionicons name={isLiked ? 'heart' : 'heart-outline'} size={22} color={isLiked ? '#E53E3E' : '#555'} />
                                <Text style={styles.actionText}>{likeCount}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.action}>
                                <Ionicons name="chatbubble-outline" size={21} color="#555" />
                                <Text style={styles.actionText}>{comments.length}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.action} onPress={handleShare}>
                                <Ionicons name="share-social-outline" size={21} color="#555" />
                                <Text style={styles.actionText}>{post.sharesCount ?? 0}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}

                {/* Comentários */}
                <Text style={{ marginHorizontal: 20, marginTop: 16, marginBottom: 8, fontWeight: '800', fontSize: 15, color: '#1A1A2E' }}>
                    Comentários ({comments.length})
                </Text>

                {comments.map(c => <CommentCard key={c.id} comment={c} />)}

                {comments.length === 0 && !isLoading && (
                    <Text style={{ color: '#999', textAlign: 'center', marginTop: 12 }}>
                        Nenhum comentário ainda. Seja o primeiro! 💬
                    </Text>
                )}
            </ScrollView>

            {/* Input de comentário */}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.commentInput}
                    placeholder="Escreva um comentário..."
                    placeholderTextColor="#C0B4D8"
                    value={commentText}
                    onChangeText={setCommentText}
                    multiline
                    editable={!isSending}
                />
                <TouchableOpacity
                    style={[styles.sendButton, { opacity: commentText.trim() ? 1 : 0.5 }]}
                    onPress={handleSend}
                    disabled={isSending || !commentText.trim()}
                >
                    {isSending ? (
                        <ActivityIndicator size="small" color="#fff" />
                    ) : (
                        <Ionicons name="send" size={18} color="#fff" />
                    )}
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}
