import React from 'react';
import {
    View, Text, ScrollView, Pressable, ActivityIndicator,
    TouchableOpacity, Image, RefreshControl, ImageBackground,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { BottomBar } from '../../components/BottomBar';
import { useMyProgress } from '../../hooks/useProgress';
import { useCommunities } from '../../hooks/useCommunity';
import type { CommunityProgress, Community } from '../../types';

// Cores por nível
const LEVEL_COLORS: Record<number, { primary: string; light: string; text: string; track: string }> = {
    1: { primary: '#48BB78', light: '#F0FFF4', text: '#276749', track: '#9AE6B420' },
    2: { primary: '#4299E1', light: '#EBF8FF', text: '#2B6CB0', track: '#90CDF420' },
    3: { primary: '#805AD5', light: '#FAF5FF', text: '#553C9A', track: '#D6BCFA20' },
    4: { primary: '#ED8936', light: '#FFFAF0', text: '#7B341E', track: '#FBD38D20' },
    5: { primary: '#E53E3E', light: '#FFF5F5', text: '#9B2335', track: '#FEB2B220' },
};

const ICON_MAP: Record<string, any> = {
    camera: 'camera', 'musical-notes': 'musical-notes', restaurant: 'restaurant',
    book: 'book', brush: 'brush', leaf: 'leaf', body: 'body', grid: 'grid',
    'color-wand': 'color-wand', pencil: 'pencil', 'color-palette': 'color-palette',
    fitness: 'fitness', star: 'star',
};

function XpBar({ percent, color, track }: { percent: number; color: string; track: string }) {
    return (
        <View style={{ height: 8, borderRadius: 4, backgroundColor: track, overflow: 'hidden', flex: 1 }}>
            <View style={{ height: '100%', width: `${Math.max(2, percent)}%` as any, backgroundColor: color, borderRadius: 4 }} />
        </View>
    );
}

function HobbyCard({ progress, community, onPress }: {
    progress: CommunityProgress;
    community?: Community;
    onPress: () => void;
}) {
    const clr      = LEVEL_COLORS[progress.levelNumber] || LEVEL_COLORS[1];
    const iconName = ICON_MAP[community?.icon || 'star'] || 'star';
    const imgUrl   = community?.coverImageUrl || community?.banner;

    return (
        <TouchableOpacity
            style={{
                backgroundColor: '#fff',
                borderRadius: 20,
                marginBottom: 14,
                overflow: 'hidden',
                shadowColor: clr.primary,
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.12,
                shadowRadius: 10,
                elevation: 4,
            }}
            activeOpacity={0.88}
            onPress={onPress}
        >
            {/* Mini banner */}
            {imgUrl ? (
                <ImageBackground
                    source={{ uri: imgUrl }}
                    style={{ height: 70, justifyContent: 'flex-end' }}
                >
                    <View style={{ ...{ position: 'absolute', inset: 0 } as any, backgroundColor: 'rgba(0,0,0,0.35)' }} />
                    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10, gap: 8 }}>
                        <Ionicons name={iconName} size={18} color="#fff" />
                        <Text style={{ color: '#fff', fontWeight: '800', fontSize: 16, letterSpacing: -0.3 }}>
                            {progress.communityName || progress.communitySlug}
                        </Text>
                    </View>
                </ImageBackground>
            ) : (
                <View style={{ height: 50, backgroundColor: clr.primary, flexDirection: 'row', alignItems: 'center', padding: 12, gap: 8 }}>
                    <Ionicons name={iconName} size={18} color="#fff" />
                    <Text style={{ color: '#fff', fontWeight: '800', fontSize: 15 }}>
                        {progress.communityName || progress.communitySlug}
                    </Text>
                </View>
            )}

            {/* Corpo do card */}
            <View style={{ padding: 14, gap: 10 }}>
                {/* Nível em romano + nome */}
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{
                        backgroundColor: clr.light, borderRadius: 10, borderWidth: 1.5,
                        borderColor: clr.primary + '50', paddingHorizontal: 10, paddingVertical: 4,
                        flexDirection: 'row', alignItems: 'center', gap: 6,
                    }}>
                        {/* ★ Número romano em destaque */}
                        <Text style={{ fontSize: 18, fontWeight: '900', color: clr.primary }}>
                            {progress.levelRoman}
                        </Text>
                        <Text style={{ fontSize: 11, fontWeight: '700', color: clr.text }}>
                            {progress.levelName}
                        </Text>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                        {progress.streak > 0 && (
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                                <Text style={{ fontSize: 14 }}>🔥</Text>
                                <Text style={{ fontSize: 12, fontWeight: '700', color: '#ED8936' }}>
                                    {progress.streak}d
                                </Text>
                            </View>
                        )}
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                            <Ionicons name="flash" size={13} color={clr.primary} />
                            <Text style={{ fontSize: 12, fontWeight: '700', color: clr.text }}>
                                {progress.totalXp} XP
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Barra de progresso */}
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <XpBar percent={progress.progressPercent} color={clr.primary} track={clr.light} />
                    <Text style={{ fontSize: 12, fontWeight: '800', color: clr.primary, minWidth: 36 }}>
                        {progress.progressPercent}%
                    </Text>
                </View>

                {/* CTA */}
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', gap: 4 }}>
                    <Text style={{ fontSize: 12, color: clr.primary, fontWeight: '700' }}>Ver comunidade</Text>
                    <Ionicons name="chevron-forward" size={14} color={clr.primary} />
                </View>
            </View>
        </TouchableOpacity>
    );
}

// ── Tela ───────────────────────────────────────────────────────────────────
export default function MeusHobbies() {
    const router = useRouter();
    const { progresses, isLoading: loadingProg, error: errorProg, refresh: refreshProg } = useMyProgress();
    const { communities } = useCommunities();

    const [refreshing, setRefreshing] = React.useState(false);

    const handleRefresh = async () => {
        setRefreshing(true);
        await refreshProg();
        setRefreshing(false);
    };

    const communityOf = (slug: string) => communities.find(c => c.slug === slug);

    return (
        <View style={{ flex: 1, backgroundColor: '#F6F1F8' }}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 120 }}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} tintColor="#5e17eb" />
                }
            >
                {/* Header manual */}
                <View style={{
                    flexDirection: 'row', alignItems: 'center', gap: 12,
                    paddingTop: 56, paddingBottom: 16, paddingHorizontal: 20,
                    backgroundColor: '#fff',
                    borderBottomWidth: 1, borderBottomColor: '#F0E8FB',
                    shadowColor: '#5e17eb', shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.06, shadowRadius: 6, elevation: 2,
                }}>
                    <Pressable
                        onPress={() => router.back()}
                        style={{ width: 36, height: 36, borderRadius: 12, backgroundColor: '#F3E8FF', justifyContent: 'center', alignItems: 'center' }}
                    >
                        <Ionicons name="arrow-back" size={20} color="#5e17eb" />
                    </Pressable>
                    <Text style={{ fontSize: 20, fontWeight: '900', color: '#1A1A2E', letterSpacing: -0.3 }}>
                        Meus Hobbies
                    </Text>
                </View>

                <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
                    {/* Subtítulo */}
                    <Text style={{ color: '#9B8FBB', fontSize: 13, marginBottom: 20, lineHeight: 18 }}>
                        Acompanhe seu progresso, XP e insígnias em cada comunidade.
                    </Text>

                    {/* Loading */}
                    {loadingProg && (
                        <ActivityIndicator color="#5e17eb" style={{ marginTop: 40 }} />
                    )}

                    {/* Erro */}
                    {errorProg && !loadingProg && (
                        <View style={{ alignItems: 'center', marginTop: 20 }}>
                            <Text style={{ color: '#999', marginBottom: 12 }}>{errorProg}</Text>
                            <Pressable onPress={refreshProg}>
                                <Text style={{ color: '#5e17eb', fontWeight: '700' }}>Tentar novamente</Text>
                            </Pressable>
                        </View>
                    )}

                    {/* Vazio */}
                    {!loadingProg && !errorProg && progresses.length === 0 && (
                        <View style={{ alignItems: 'center', paddingVertical: 40, gap: 12 }}>
                            <Text style={{ fontSize: 48 }}>🏅</Text>
                            <Text style={{ color: '#9B8FBB', fontSize: 14, textAlign: 'center' }}>
                                Você ainda não entrou em nenhuma comunidade.{'\n'}
                                Explore e ganhe suas primeiras insígnias!
                            </Text>
                            <TouchableOpacity
                                style={{ backgroundColor: '#5e17eb', borderRadius: 22, paddingHorizontal: 24, paddingVertical: 12, marginTop: 4 }}
                                onPress={() => router.push('/home')}
                            >
                                <Text style={{ color: '#fff', fontWeight: '800', fontSize: 14 }}>Explorar comunidades</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    {/* Lista de hobbies com progresso */}
                    {!loadingProg && progresses
                        .sort((a, b) => b.totalXp - a.totalXp)
                        .map(prog => (
                            <HobbyCard
                                key={prog.communitySlug}
                                progress={prog}
                                community={communityOf(prog.communitySlug)}
                                onPress={() => router.push(`/community/${prog.communitySlug}`)}
                            />
                        ))
                    }
                </View>
            </ScrollView>

            <BottomBar />
        </View>
    );
}
