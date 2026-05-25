import React from "react";

import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    ImageBackground,
    ActivityIndicator,
} from "react-native";

import {
    Ionicons,
    Feather,
} from "@expo/vector-icons";

import { useLocalSearchParams, useRouter } from "expo-router";

import { AppHeader } from "../../components/Header";
import { BottomBar } from "../../components/BottomBar";

import { communityStyles as styles } from "../../styles/screens/communityStyles";

// INTEGRAÇÃO
import { useCommunityPosts } from "../../hooks/usePosts";
import type { Post } from "../../types";

// ================= CARD DE POST =================
function PostCard({ post, onLike, onPress }: {
    post: Post | null | undefined;
    onLike: (id: string) => void;
    onPress: (id: string) => void;
}) {
    if (!post || !post.id) return null;
    
    return (
        <View style={styles.card}>

            <TouchableOpacity activeOpacity={0.85} onPress={() => onPress(post.id)}>

                {/* TOPO */}
                <View style={styles.cardHeader}>

                    <View style={styles.userInfo}>

                        {post.user.avatarUrl ? (
                            <Image source={{ uri: post.user.avatarUrl }} style={styles.avatar} />
                        ) : (
                            <Image source={require("../../assets/perfilpadrao.png")} style={styles.avatar} />
                        )}

                        <View>
                            <Text style={styles.username}>{post.user.name}</Text>
                            <Text style={styles.time}>
                                {new Date(post.createdAt).toLocaleDateString('pt-BR', {
                                    day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit'
                                })}
                            </Text>
                        </View>

                    </View>

                    <TouchableOpacity>
                        <Feather name="more-horizontal" size={22} color="#222" />
                    </TouchableOpacity>

                </View>

                {/* TEXTO */}
                <Text style={styles.postText}>{post.text}</Text>

                {/* IMAGEM (opcional) */}
                {post.imageUrl && (
                    <ImageBackground
                        source={{ uri: post.imageUrl }}
                        style={styles.postImage}
                        imageStyle={styles.postImageRadius}
                    />
                )}

                {/* FOOTER */}
                <View style={styles.footer}>

                    <View style={styles.leftActions}>

                        {/* LIKE */}
                        <TouchableOpacity
                            style={styles.action}
                            onPress={() => onLike(post.id)}
                        >
                            <Ionicons
                                name={post.isLiked ? "heart" : "heart-outline"}
                                size={20}
                                color={post.isLiked ? "#E53E3E" : "#444"}
                            />
                            <Text style={styles.actionText}>{post.likesCount}</Text>
                        </TouchableOpacity>

                        {/* COMMENT */}
                        <TouchableOpacity style={styles.action}>
                            <Ionicons name="chatbubble-outline" size={19} color="#444" />
                            <Text style={styles.actionText}>{post.commentsCount}</Text>
                        </TouchableOpacity>

                        {/* SAVE */}
                        <TouchableOpacity style={styles.action}>
                            <Ionicons
                                name={post.isSaved ? "bookmark" : "bookmark-outline"}
                                size={18}
                                color={post.isSaved ? "#6D28D9" : "#444"}
                            />
                            <Text style={styles.actionText}>{post.savesCount}</Text>
                        </TouchableOpacity>

                    </View>

                    {/* SHARE */}
                    <TouchableOpacity>
                        <Ionicons name="share-social-outline" size={21} color="#444" />
                    </TouchableOpacity>

                </View>

            </TouchableOpacity>
        </View>
    );
}

// ================= TELA =================
export default function CommunityScreen() {

    const { slug } = useLocalSearchParams<{ slug: string }>();
    const router = useRouter();

    const { posts, isLoading, error, refresh, toggleLike } = useCommunityPosts(slug || '');

    if (!slug?.trim()) {
        return (
            <View style={styles.container}>
                <AppHeader
                    title="Comunidade"
                    variant="com-fundo"
                    showBackButton={true}
                    showNotification={true}
                    rightButton="profile"
                />
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: '#999' }}>Comunidade não encontrada.</Text>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>

            {/* HEADER */}
            <AppHeader
                title={slug ? String(slug).charAt(0).toUpperCase() + String(slug).slice(1) : 'Comunidade'}
                variant="com-fundo"
                showBackButton={true}
                showNotification={true}
                rightButton="profile"
            />

            {/* FEED */}
            <ScrollView
                style={styles.scroll}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingTop: 130, paddingBottom: 160 }}
                onScrollEndDrag={refresh}
            >

                {isLoading && (
                    <ActivityIndicator color="#6D28D9" style={{ marginTop: 32 }} />
                )}

                {error && !isLoading && (
                    <View style={{ alignItems: 'center', marginTop: 32 }}>
                        <Text style={{ color: '#999', marginBottom: 12 }}>{error}</Text>
                        <TouchableOpacity onPress={refresh}>
                            <Text style={{ color: '#6D28D9', fontWeight: '600' }}>Tentar novamente</Text>
                        </TouchableOpacity>
                    </View>
                )}

                {!isLoading && !error && posts.length === 0 && (
                    <Text style={{ color: '#999', textAlign: 'center', marginTop: 40 }}>
                        Nenhum post ainda. Seja o primeiro!
                    </Text>
                )}

                {!isLoading && posts.map((post) => (
                    <PostCard
                        key={post.id}
                        post={post}
                        onLike={toggleLike}
                        onPress={(id) => router.push(`/community/post/${id}`)}
                    />
                ))}

            </ScrollView>

            {/* BOTÃO FLUTUANTE */}
            <TouchableOpacity
                style={styles.floatingButton}
                activeOpacity={0.85}
                onPress={() => router.push('/community/post/create')}
            >
                <Ionicons name="paper-plane" size={24} color="#FFF" />
            </TouchableOpacity>

            <BottomBar />

        </View>
    );
}
