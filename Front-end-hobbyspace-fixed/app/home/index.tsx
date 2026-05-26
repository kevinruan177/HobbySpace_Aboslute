import React, { useState, useMemo, useCallback } from 'react';
import {
    View, Text, TextInput, ScrollView, TouchableOpacity,
    ImageBackground, ActivityIndicator, RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useFocusEffect } from 'expo-router';

import { AppHeader } from '../../components/Header';
import { BottomBar } from '../../components/BottomBar';
import { ProgressCard } from '../../components/ProgressCard';
import { homestyles as styles } from '../../styles/screens/homeStyles';
import { useCommunities } from '../../hooks/useCommunity';
import { useMyProgress } from '../../hooks/useProgress';
import type { Community } from '../../types';

// ── Alturas alternadas para o efeito Pinterest ─────────────
const LEFT_HEIGHTS  = [200, 250, 180, 230, 210, 190];
const RIGHT_HEIGHTS = [240, 170, 230, 190, 250, 180];

function communityImageUrl(c: Community): string {
    return (
        c.coverImageUrl ||
        c.banner ||
        `https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&auto=format&fit=crop&q=80`
    );
}

function formatCount(n: number): string {
    if (n >= 1000) return `${(n / 1000).toFixed(n % 1000 >= 100 ? 1 : 0)}K`;
    return String(n);
}

// ── Card do Pinterest ───────────────────────────────────────
function CommunityCard({
    community, height, onPress,
}: { community: Community; height: number; onPress: () => void }) {
    return (
        <TouchableOpacity
            activeOpacity={0.85}
            onPress={onPress}
            style={[styles.discoverCard, { height }]}
        >
            <ImageBackground
                source={{ uri: communityImageUrl(community) }}
                style={styles.discoverImg}
                imageStyle={styles.imageRadius}
            >
                <View style={styles.cardOverlay}>
                    {community.isMember && (
                        <View style={{
                            alignSelf: 'flex-start', backgroundColor: '#5e17eb',
                            borderRadius: 8, paddingHorizontal: 6, paddingVertical: 2, marginBottom: 4,
                        }}>
                            <Text style={{ color: '#fff', fontSize: 9, fontWeight: '800' }}>MEMBRO</Text>
                        </View>
                    )}
                    <Text style={styles.cardTitle} numberOfLines={1}>{community.title}</Text>
                    <Text style={styles.cardSub}>
                        👥 {formatCount(community.membersCount)} pessoas
                    </Text>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    );
}

// ── Tela principal ──────────────────────────────────────────
export default function Home() {
    const router = useRouter();
    const [search, setSearch] = useState('');
    const [refreshing, setRefreshing] = useState(false);

    const { communities, isLoading: loadingComm, refresh: refreshComm } = useCommunities();
    const { progresses, isLoading: loadingProg, refresh: refreshProg } = useMyProgress();

    // Atualiza comunidades ao voltar para a home (ex: após entrar/sair de um hobby)
    useFocusEffect(
        useCallback(() => {
            refreshComm();
        }, [])
    );

    const handleRefresh = async () => {
        setRefreshing(true);
        await Promise.all([refreshComm(), refreshProg()]);
        setRefreshing(false);
    };

    const filtered = useMemo(() => {
        const q = search.toLowerCase().trim();
        return q ? communities.filter(c => c.title.toLowerCase().includes(q)) : communities;
    }, [communities, search]);

    // Split Pinterest: coluna esquerda e direita
    const leftItems  = filtered.filter((_, i) => i % 2 === 0);
    const rightItems = filtered.filter((_, i) => i % 2 !== 0);

    const isLoading = loadingComm && communities.length === 0;

    return (
        <View style={{ flex: 1, backgroundColor: '#F6F1F8' }}>
            <AppHeader
                title="HobbySpace"
                variant="com-fundo"
                showNotification={true}
                rightButton="settings"
            />

            <ScrollView
                style={styles.scroll}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingTop: 110, paddingBottom: 120 }}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} tintColor="#5e17eb" />
                }
            >
                {/* ── MEU PROGRESSO ─────────────────────────── */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Meu Progresso</Text>
                    <TouchableOpacity onPress={() => router.push('/home/myhobbies')}>
                        <Text style={styles.verMais}>Ver Todos</Text>
                    </TouchableOpacity>
                </View>

                {loadingProg ? (
                    <ActivityIndicator color="#5e17eb" style={{ marginVertical: 16, marginLeft: 20 }} />
                ) : progresses.length === 0 ? (
                    <TouchableOpacity
                        style={styles.emptyProgress}
                        onPress={() => router.push('/home/myhobbies')}
                    >
                        <Ionicons name="trophy-outline" size={24} color="#5e17eb" />
                        <Text style={styles.emptyProgressText}>
                            Entre em comunidades para ganhar XP e desbloquear insígnias!
                        </Text>
                        <Ionicons name="chevron-forward" size={16} color="#5e17eb" />
                    </TouchableOpacity>
                ) : (
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.progressScroll}
                    >
                        {progresses
                            .sort((a, b) => b.totalXp - a.totalXp)
                            .slice(0, 8)
                            .map(prog => (
                                <ProgressCard
                                    key={prog.communitySlug}
                                    progress={prog}
                                    onPress={() => router.push(`/community/${prog.communitySlug}`)}
                                />
                            ))}
                    </ScrollView>
                )}

                

                {/* ── COMUNIDADES ───────────────────────────── */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Comunidades</Text>
                    <Text style={{ fontSize: 12, color: '#9B8FBB' }}>{filtered.length} disponíveis</Text>
                </View>

                {/* ── BUSCA ─────────────────────────────────── */}
                <View style={styles.searchContainer}>
                    <Ionicons name="search" size={18} color="#9B8FBB" />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Buscar comunidades..."
                        placeholderTextColor="#C0B4D8"
                        value={search}
                        onChangeText={setSearch}
                    />
                    {search.length > 0 && (
                        <TouchableOpacity onPress={() => setSearch('')}>
                            <Ionicons name="close-circle" size={18} color="#9B8FBB" />
                        </TouchableOpacity>
                    )}
                </View>

                {isLoading ? (
                    <ActivityIndicator color="#5e17eb" style={{ marginTop: 40 }} />
                ) : filtered.length === 0 ? (
                    <Text style={{ color: '#999', textAlign: 'center', marginTop: 32, fontSize: 14 }}>
                        Nenhuma comunidade encontrada.
                    </Text>
                ) : (
                    <View style={styles.gridContainer}>
                        {/* Coluna Esquerda */}
                        <View style={styles.column}>
                            {leftItems.map((c, i) => (
                                <CommunityCard
                                    key={c.slug}
                                    community={c}
                                    height={LEFT_HEIGHTS[i % LEFT_HEIGHTS.length]}
                                    onPress={() => router.push(`/community/${c.slug}`)}
                                />
                            ))}
                        </View>
                        {/* Coluna Direita — offset visual */}
                        <View style={[styles.column, { marginTop: 32 }]}>
                            {rightItems.map((c, i) => (
                                <CommunityCard
                                    key={c.slug}
                                    community={c}
                                    height={RIGHT_HEIGHTS[i % RIGHT_HEIGHTS.length]}
                                    onPress={() => router.push(`/community/${c.slug}`)}
                                />
                            ))}
                        </View>
                    </View>
                )}
            </ScrollView>

            

            <BottomBar />
        </View>
    );
}