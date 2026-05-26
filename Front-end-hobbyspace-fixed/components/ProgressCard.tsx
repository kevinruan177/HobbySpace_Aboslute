import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { CommunityProgress } from '../types';

// Badge level colors
const LEVEL_COLORS: Record<number, { primary: string; light: string; text: string }> = {
    1: { primary: '#48BB78', light: '#F0FFF4', text: '#276749' },
    2: { primary: '#4299E1', light: '#EBF8FF', text: '#2B6CB0' },
    3: { primary: '#805AD5', light: '#FAF5FF', text: '#553C9A' },
    4: { primary: '#ED8936', light: '#FFFAF0', text: '#7B341E' },
    5: { primary: '#E53E3E', light: '#FFF5F5', text: '#9B2335' },
};

const ICON_MAP: Record<string, keyof typeof Ionicons.glyphMap> = {
    camera: 'camera',
    'musical-notes': 'musical-notes',
    restaurant: 'restaurant',
    book: 'book',
    brush: 'brush',
    leaf: 'leaf',
    body: 'body',
    grid: 'grid',
    'color-wand': 'color-wand',
    pencil: 'pencil',
    'color-palette': 'color-palette',
    fitness: 'fitness',
    star: 'star',
};

interface Props {
    progress: CommunityProgress;
    onPress?: () => void;
}

export function ProgressCard({ progress, onPress }: Props) {
    const levelColors = LEVEL_COLORS[progress.levelNumber] || LEVEL_COLORS[1];
    const iconName    = ICON_MAP[progress.communityIcon || 'star'] || 'star';

    return (
        <TouchableOpacity
            style={[styles.card, { backgroundColor: levelColors.light, borderColor: levelColors.primary + '40' }]}
            activeOpacity={0.85}
            onPress={onPress}
        >
            {/* Ícone + nome */}
            <View style={styles.top}>
                <View style={[styles.iconWrap, { backgroundColor: levelColors.primary + '20' }]}>
                    <Ionicons name={iconName as any} size={18} color={levelColors.primary} />
                </View>
                <View style={styles.topText}>
                    <Text style={[styles.communityName, { color: levelColors.text }]} numberOfLines={1}>
                        {progress.communityName || progress.communitySlug}
                    </Text>
                    <Text style={[styles.levelLabel, { color: levelColors.primary }]}>
                        Nível {progress.levelRoman} · {progress.levelName}
                    </Text>
                </View>
            </View>

            {/* Barra de progresso */}
            <View style={styles.progressWrap}>
                <View style={[styles.progressTrack, { backgroundColor: levelColors.primary + '25' }]}>
                    <View
                        style={[
                            styles.progressFill,
                            { width: `${progress.progressPercent}%` as any, backgroundColor: levelColors.primary },
                        ]}
                    />
                </View>
                <Text style={[styles.progressPct, { color: levelColors.text }]}>
                    {progress.progressPercent}%
                </Text>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
                <View style={styles.xpRow}>
                    <Ionicons name="flash" size={12} color={levelColors.primary} />
                    <Text style={[styles.xpText, { color: levelColors.text }]}>{progress.totalXp} XP</Text>
                </View>
                {progress.streak > 0 && (
                    <View style={styles.streakRow}>
                        <Text style={styles.streakFire}>🔥</Text>
                        <Text style={[styles.streakText, { color: levelColors.text }]}>{progress.streak}d</Text>
                    </View>
                )}
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        width: 160,
        borderRadius: 16,
        borderWidth: 1.5,
        padding: 14,
        marginRight: 12,
        gap: 10,
    },
    top: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    iconWrap: { width: 34, height: 34, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
    topText: { flex: 1 },
    communityName: { fontSize: 13, fontWeight: '700', marginBottom: 1 },
    levelLabel: { fontSize: 10, fontWeight: '600' },
    progressWrap: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    progressTrack: { flex: 1, height: 6, borderRadius: 3, overflow: 'hidden' },
    progressFill: { height: '100%', borderRadius: 3 },
    progressPct: { fontSize: 10, fontWeight: '700', minWidth: 28, textAlign: 'right' },
    footer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    xpRow: { flexDirection: 'row', alignItems: 'center', gap: 3 },
    xpText: { fontSize: 11, fontWeight: '600' },
    streakRow: { flexDirection: 'row', alignItems: 'center', gap: 2 },
    streakFire: { fontSize: 11 },
    streakText: { fontSize: 11, fontWeight: '600' },
});
