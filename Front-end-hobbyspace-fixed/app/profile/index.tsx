import React, { useState } from 'react';
import { AppHeader } from '../../components/Header';
import {
    View, Text, Image, ScrollView, TouchableOpacity,
    ActivityIndicator, Alert, RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { profileStyles as styles } from '../../styles/screens/profile.Styles';
import { BottomBar } from '../../components/BottomBar';
import { BadgeChip } from '../../components/BadgeChip';
import { useAuth } from '../../context/AuthContext';
import { useMyProgress } from '../../hooks/useProgress';
import { api } from '../../services/api';

const LEVEL_COLORS: Record<number, string> = {
    1: '#48BB78', 2: '#4299E1', 3: '#805AD5', 4: '#ED8936', 5: '#E53E3E',
};
const ICON_MAP: Record<string, string> = {
    camera: 'camera', 'musical-notes': 'musical-notes', restaurant: 'restaurant',
    book: 'book', brush: 'brush', leaf: 'leaf', body: 'body', grid: 'grid',
    'color-wand': 'color-wand', pencil: 'pencil', 'color-palette': 'color-palette',
    fitness: 'fitness', star: 'star',
};

export default function Perfil() {
    const router = useRouter();
    const { user, logout, refreshUser } = useAuth();
    const { progresses, isLoading: loadingProgress, refresh: refreshProgress } = useMyProgress();
    const [uploading, setUploading] = useState(false);

    const topProg = [...progresses].sort((a, b) => b.totalXp - a.totalXp)[0];
    const totalXp = progresses.reduce((s, p) => s + p.totalXp, 0);

    // ── Padrão idêntico ao MeetParrot ────────────────────────────────────
    const handleLogout = async () => {

        console.log('CLICOU LOGOUT');

        await logout();

        console.log('LOGOUT FINALIZADO');

        router.replace('/auth/login');
    };

    const confirmLogout = async () => {

        console.log('CONFIRM LOGOUT');

        await handleLogout();

    };

    const handleRefresh = async () => {
        await Promise.all([refreshUser(), refreshProgress()]);
    };

    const handlePickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permissão negada', 'Precisamos de acesso à sua galeria.');
            return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true, aspect: [1, 1], quality: 0.7, base64: true,
        });
        if (!result.canceled && result.assets[0]?.base64) {
            setUploading(true);
            try {
                const asset = result.assets[0];
                const ext = asset.uri.split('.').pop()?.toLowerCase() ?? 'jpg';
                const mime = ext === 'png' ? 'image/png' : 'image/jpeg';
                await api.patch('/auth/me', { avatarBase64: `data:${mime};base64,${asset.base64}` });
                await refreshUser();
                Alert.alert('Sucesso', 'Foto de perfil atualizada!');
            } catch (e: any) {
                Alert.alert('Erro', e?.message || 'Não foi possível atualizar a foto.');
            } finally {
                setUploading(false);
            }
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#F6F1F8' }}>
            <AppHeader title="Perfil" variant="com-fundo" showBackButton={false} showNotification rightButton="settings" />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingTop: 110, paddingBottom: 120 }}
                refreshControl={<RefreshControl refreshing={false} onRefresh={handleRefresh} tintColor="#5e17eb" />}
            >
                {/* HERO */}
                <View style={styles.heroSection}>
                    <TouchableOpacity style={styles.avatarWrapper} onPress={handlePickImage} disabled={uploading}>
                        {uploading ? (
                            <ActivityIndicator color="#5e17eb" style={{ width: 90, height: 90 }} />
                        ) : user?.avatarUrl ? (
                            <Image source={{ uri: user.avatarUrl }} style={styles.avatar} />
                        ) : (
                            <Image source={require('../../assets/perfilpadrao.png')} style={styles.avatar} />
                        )}
                        <View style={styles.cameraIcon}>
                            <Ionicons name="camera" size={14} color="#fff" />
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.name}>{user?.name ?? '—'}</Text>
                    <Text style={styles.email}>{user?.email ?? ''}</Text>
                    {user?.bio ? <Text style={styles.bio}>{user.bio}</Text> : null}
                    {totalXp > 0 && (
                        <View style={styles.xpBadge}>
                            <Ionicons name="flash" size={14} color="#fff" />
                            <Text style={styles.xpBadgeText}>{totalXp} XP total</Text>
                        </View>
                    )}
                </View>

                {/* STATS */}
                <View style={styles.statsRow}>
                    <View style={styles.statBox}>
                        <Text style={styles.statNum}>{progresses.length}</Text>
                        <Text style={styles.statLabel}>Comunidades</Text>
                    </View>
                    <View style={[styles.statBox, styles.statBorder]}>
                        <Text style={styles.statNum}>{topProg?.levelRoman ?? '—'}</Text>
                        <Text style={styles.statLabel}>Melhor nível</Text>
                    </View>
                    <View style={styles.statBox}>
                        <Text style={styles.statNum}>
                            {progresses.reduce((max, p) => Math.max(max, p.streak), 0)}🔥
                        </Text>
                        <Text style={styles.statLabel}>Maior streak</Text>
                    </View>
                </View>

                {/* BADGES */}
                <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
                    <Text style={styles.sectionTitle}>Minhas Insígnias</Text>
                    {loadingProgress ? (
                        <ActivityIndicator color="#5e17eb" style={{ marginTop: 16 }} />
                    ) : progresses.length === 0 ? (
                        <View style={styles.emptyBadges}>
                            <Text style={{ fontSize: 32 }}>🏅</Text>
                            <Text style={styles.emptyText}>Entre em comunidades para ganhar insígnias!</Text>
                            <TouchableOpacity style={styles.exploreBtn} onPress={() => router.push('/home')}>
                                <Text style={styles.exploreBtnText}>Explorar comunidades</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        [...progresses].sort((a, b) => b.totalXp - a.totalXp).map(prog => {
                            const color = LEVEL_COLORS[prog.levelNumber] || '#805AD5';
                            const iconName = ICON_MAP[prog.communityIcon || 'star'] || 'star';
                            return (
                                <TouchableOpacity key={prog.communitySlug} style={styles.badgeCard}
                                    onPress={() => router.push(`/community/${prog.communitySlug}`)} activeOpacity={0.82}>
                                    <View style={[styles.badgeIconWrap, { backgroundColor: color + '20', borderColor: color + '40' }]}>
                                        <Ionicons name={iconName as any} size={22} color={color} />
                                    </View>
                                    <View style={styles.badgeInfo}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                                            <Text style={styles.badgeName}>{prog.communityName || prog.communitySlug}</Text>
                                            <BadgeChip badge={{ levelName: prog.levelName, levelRoman: prog.levelRoman, badge: prog.badge, communitySlug: prog.communitySlug }} size="sm" />
                                        </View>
                                        <View style={styles.badgeProgressRow}>
                                            <View style={[styles.badgeTrack, { backgroundColor: color + '25' }]}>
                                                <View style={[styles.badgeFill, { width: `${prog.progressPercent}%` as any, backgroundColor: color }]} />
                                            </View>
                                            <Text style={[styles.badgeXp, { color }]}>{prog.totalXp} XP</Text>
                                        </View>
                                        {prog.streak > 0 && <Text style={styles.streakText}>🔥 {prog.streak} dias de sequência</Text>}
                                    </View>
                                    <Ionicons name="chevron-forward" size={16} color="#CCC" />
                                </TouchableOpacity>
                            );
                        })
                    )}
                </View>

                {/* ACTIONS */}
                <View style={{ paddingHorizontal: 20, marginTop: 24, gap: 10 }}>
                    <TouchableOpacity style={styles.actionRow} onPress={() => router.push('/settings')}>
                        <Ionicons name="settings-outline" size={20} color="#5e17eb" />
                        <Text style={styles.actionLabel}>Configurações</Text>
                        <Ionicons name="chevron-forward" size={16} color="#CCC" />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.actionRow, { borderColor: '#FECACA' }]} onPress={confirmLogout}>
                        <Ionicons name="log-out-outline" size={20} color="#E53E3E" />
                        <Text style={[styles.actionLabel, { color: '#E53E3E', flex: 1 }]}>Sair</Text>
                        <Ionicons name="chevron-forward" size={16} color="#FECACA" />
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <BottomBar />
        </View>
    );
}
