import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { BadgeInfo } from '../types';

// Mapeamento de badge → cor
const BADGE_COLORS: Record<string, { bg: string; text: string; border: string }> = {
    novato:       { bg: '#F0FFF4', text: '#276749', border: '#9AE6B4' },
    aprendiz:     { bg: '#EBF8FF', text: '#2B6CB0', border: '#90CDF4' },
    entusiasta:   { bg: '#FAF5FF', text: '#553C9A', border: '#D6BCFA' },
    especialista: { bg: '#FFFAF0', text: '#7B341E', border: '#FBD38D' },
    mestre:       { bg: '#FFF5F5', text: '#9B2335', border: '#FEB2B2' },
};

const DEFAULT_COLORS = { bg: '#F7FAFC', text: '#4A5568', border: '#E2E8F0' };

interface Props {
    badge: BadgeInfo | null | undefined;
    size?: 'sm' | 'md';
}

export function BadgeChip({ badge, size = 'sm' }: Props) {
    if (!badge) return null;
    const colors = BADGE_COLORS[badge.badge] || DEFAULT_COLORS;
    const isSm   = size === 'sm';

    return (
        <View style={[
            styles.chip,
            { backgroundColor: colors.bg, borderColor: colors.border },
            isSm ? styles.chipSm : styles.chipMd,
        ]}>
            <Text style={[
                styles.text,
                { color: colors.text },
                isSm ? styles.textSm : styles.textMd,
            ]}>
                {badge.levelRoman} · {badge.levelName}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    chip: {
        borderWidth: 1,
        borderRadius: 20,
        alignSelf: 'flex-start',
    },
    chipSm: { paddingHorizontal: 6, paddingVertical: 2 },
    chipMd: { paddingHorizontal: 10, paddingVertical: 4 },
    text: { fontWeight: '700', letterSpacing: 0.3 },
    textSm: { fontSize: 9 },
    textMd: { fontSize: 11 },
});
