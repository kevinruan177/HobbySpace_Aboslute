import React, { useState } from 'react';
import {
    View, Text, Image, ScrollView, TouchableOpacity,
    ImageBackground, ActivityIndicator, Alert, RefreshControl,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { AppHeader } from '../../components/Header';
import { BottomBar } from '../../components/BottomBar';
import { BadgeChip } from '../../components/BadgeChip';
import { communityStyles as styles } from '../../styles/screens/communityStyles';

import { useCommunityPosts } from '../../hooks/usePosts';
import { useCommunityDetail } from '../../hooks/useCommunity';
import { useCommunityProgress } from '../../hooks/useProgress';
import { postService } from '../../services/postService';
import type { Post } from '../../types';

function formatCount(n: number) {
    if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
    return String(n);
}

function timeAgo(dateStr: string) {
    const diff = (Date.now() - new Date(dateStr).getTime()) / 1000;
    if (diff < 60) return 'agora';
    if (diff < 3600) return `${Math.floor(diff / 60)}min`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
    return `${Math.floor(diff / 86400)}d`;
}

// ── Card de Post ────────────────────────────────────────────
function PostCard({
    post, onLike, onPress, onShare,
}: {
    post: Post;
    onLike: (id: string) => void;
    onPress: (id: string) => void;
    onShare: (id: string) => void;
}) {
    return (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <View style={styles.userInfo}>
                    {post.user.avatarUrl ? (
                        <Image source={{ uri: post.user.avatarUrl }} style={styles.avatar} />
                    ) : (
                        <Image source={require('../../assets/perfilpadrao.png')} style={styles.avatar} />
                    )}
                    <View style={styles.userMeta}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                            <Text style={styles.username}>{post.user.name}</Text>
                            <BadgeChip badge={post.user.badge} size="sm" />
                        </View>
                        <Text style={styles.time}>{timeAgo(post.createdAt)}</Text>
                    </View>
                </View>
                <TouchableOpacity>
                    <Feather name="more-horizontal" size={20} color="#AAA" />
                </TouchableOpacity>
            </View>

            <TouchableOpacity activeOpacity={0.9} onPress={() => onPress(post.id)}>
                <Text style={styles.postText}>{post.text}</Text>
                {post.imageUrl && (
                    <ImageBackground
                        source={{ uri: post.imageUrl }}
                        style={styles.postImage}
                        imageStyle={styles.postImageRadius}
                    />
                )}
            </TouchableOpacity>

            <View style={styles.footer}>
                <View style={styles.leftActions}>
                    <TouchableOpacity style={styles.action} onPress={() => onLike(post.id)}>
                        <Ionicons
                            name={post.isLiked ? 'heart' : 'heart-outline'}
                            size={20}
                            color={post.isLiked ? '#E53E3E' : '#555'}
                        />
                        <Text style={styles.actionText}>{post.likesCount}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.action} onPress={() => onPress(post.id)}>
                        <Ionicons name="chatbubble-outline" size={19} color="#555" />
                        <Text style={styles.actionText}>{post.commentsCount}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.action}>
                        <Ionicons
                            name={post.isSaved ? 'bookmark' : 'bookmark-outline'}
                            size={18}
                            color={post.isSaved ? '#5e17eb' : '#555'}
                        />
                        <Text style={styles.actionText}>{post.savesCount}</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => onShare(post.id)}>
                    <Ionicons name="share-social-outline" size={20} color="#555" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

// ── Tela ────────────────────────────────────────────────────
export default function CommunityScreen() {
    const { slug } = useLocalSearchParams<{ slug: string }>();
    const router   = useRouter();
    const [joining, setJoining] = useState(false);

    const { community, isLoading: loadingComm, refresh: refreshComm, toggleMembership } = useCommunityDetail(slug || '');
    const { posts, isLoading: loadingPosts, error, refresh: refreshPosts, toggleLike } = useCommunityPosts(slug || '');
    const { progress } = useCommunityProgress(slug || '');

    const handleToggleMembership = async () => {
        if (joining) return;
        setJoining(true);
        try {
            await toggleMembership(community?.isMember ?? false);
        } catch (e: any) {
            Alert.alert('Erro', e?.message || 'Tente novamente.');
        } finally {
            setJoining(false);
        }
    };

    const handleShare = async (postId: string) => {
        try {
            await postService.share(postId);
        } catch (_) {}
    };

    const handleRefresh = async () => {
        await Promise.all([refreshComm(), refreshPosts()]);
    };

    const title = community?.title || (slug ? String(slug).charAt(0).toUpperCase() + String(slug).slice(1) : 'Comunidade');

    return (
        <View style={styles.container}>
            <AppHeader
                title={title}
                variant="com-fundo"
                showBackButton
                showNotification
                rightButton="profile"
            />

            <ScrollView
                style={styles.scroll}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingTop: 100, paddingBottom: 140 }}
                refreshControl={
                    <RefreshControl refreshing={false} onRefresh={handleRefresh} tintColor="#5e17eb" />
                }
            >
                {/* ── BANNER ──────────────────────────────── */}
                {community?.banner || community?.coverImageUrl ? (
                    <ImageBackground
                        source={{ uri: (community.banner || community.coverImageUrl)! }}
                        style={styles.bannerWrap}
                    >
                        <View style={styles.bannerOverlay}>
                            <Text style={styles.communityTitle}>{title}</Text>
                            {community.description ? (
                                <Text style={styles.communityDesc} numberOfLines={2}>
                                    {community.description}
                                </Text>
                            ) : null}
                        </View>
                    </ImageBackground>
                ) : null}

                {/* ── INFO BAR ────────────────────────────── */}
                {!loadingComm && community && (
                    <View style={styles.infoBar}>
                        <View style={styles.infoStats}>
                            <View style={styles.statItem}>
                                <Text style={styles.statNum}>{formatCount(community.membersCount)}</Text>
                                <Text style={styles.statLabel}>Membros</Text>
                            </View>
                            <View style={styles.statItem}>
                                <Text style={styles.statNum}>{community.postsCount ?? posts.length}</Text>
                                <Text style={styles.statLabel}>Posts</Text>
                            </View>
                        </View>
                        <TouchableOpacity
                            style={community.isMember ? styles.leaveBtn : styles.joinBtn}
                            onPress={handleToggleMembership}
                            disabled={joining}
                        >
                            {joining ? (
                                <ActivityIndicator size="small" color={community.isMember ? '#5e17eb' : '#fff'} />
                            ) : (
                                <Text style={community.isMember ? styles.leaveBtnText : styles.joinBtnText}>
                                    {community.isMember ? 'Sair' : 'Entrar'}
                                </Text>
                            )}
                        </TouchableOpacity>
                    </View>
                )}

                {/* ── MEU PROGRESSO NA COMUNIDADE ─────────── */}
                {progress && progress.totalXp > 0 && (
                    <View style={styles.progressSection}>
                        <View style={styles.progressHeader}>
                            <Text style={styles.progressTitle}>
                                🏆 Meu Progresso · Nível {progress.levelRoman}
                            </Text>
                            <Text style={styles.progressXp}>{progress.totalXp} XP</Text>
                        </View>
                        <View style={styles.progressTrack}>
                            <View style={[styles.progressFill, { width: `${progress.progressPercent}%` as any }]} />
                        </View>
                        <View style={styles.progressFooter}>
                            <Text style={styles.progressLevel}>{progress.levelName}</Text>
                            {progress.streak > 0 && (
                                <Text style={styles.progressStreak}>🔥 {progress.streak} dias seguidos</Text>
                            )}
                        </View>
                    </View>
                )}

                {/* ── FEED ────────────────────────────────── */}
                {loadingPosts && posts.length === 0 && (
                    <ActivityIndicator color="#5e17eb" style={{ marginTop: 32 }} />
                )}

                {error && !loadingPosts && (
                    <View style={{ alignItems: 'center', marginTop: 32 }}>
                        <Text style={{ color: '#999', marginBottom: 12 }}>{error}</Text>
                        <TouchableOpacity onPress={refreshPosts}>
                            <Text style={{ color: '#5e17eb', fontWeight: '700' }}>Tentar novamente</Text>
                        </TouchableOpacity>
                    </View>
                )}

                {!loadingPosts && !error && posts.length === 0 && (
                    <Text style={{ color: '#999', textAlign: 'center', marginTop: 40, fontSize: 14 }}>
                        Nenhum post ainda. Seja o primeiro! ✍️
                    </Text>
                )}

                {posts.map(post => (
                    <PostCard
                        key={post.id}
                        post={post}
                        onLike={toggleLike}
                        onPress={id => router.push(`/community/post/${id}`)}
                        onShare={handleShare}
                    />
                ))}
            </ScrollView>

            {/* Botão criar post */}
            <TouchableOpacity
                style={styles.floatingButton}
                activeOpacity={0.85}
                onPress={() => router.push({ pathname: '/community/post/create', params: { slug } })}
            >
                <Ionicons name="create-outline" size={24} color="#FFF" />
            </TouchableOpacity>

            <BottomBar />
        </View>
    );
}
