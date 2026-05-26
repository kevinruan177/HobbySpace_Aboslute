import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { BadgeInfo } from '../types';

const BADGE_COLORS: Record<string, { bg: string; text: string; border: string; roman: string }> = {
    novato:       { bg: '#F0FFF4', text: '#276749', border: '#9AE6B4', roman: '#2F855A' },
    aprendiz:     { bg: '#EBF8FF', text: '#2B6CB0', border: '#90CDF4', roman: '#2C5282' },
    entusiasta:   { bg: '#FAF5FF', text: '#553C9A', border: '#D6BCFA', roman: '#44337A' },
    especialista: { bg: '#FFFAF0', text: '#7B341E', border: '#FBD38D', roman: '#C05621' },
    mestre:       { bg: '#FFF5F5', text: '#9B2335', border: '#FEB2B2', roman: '#C53030' },
};
const DEFAULT = { bg: '#F7FAFC', text: '#4A5568', border: '#E2E8F0', roman: '#2D3748' };

interface Props { badge: BadgeInfo | null | undefined; size?: 'sm' | 'md'; }

export function BadgeChip({ badge, size = 'sm' }: Props) {
    if (!badge) return null;
    const clr = BADGE_COLORS[badge.badge] || DEFAULT;
    const sm  = size === 'sm';

    return (
        <View style={[
            styles.chip,
            { backgroundColor: clr.bg, borderColor: clr.border },
            sm ? styles.chipSm : styles.chipMd,
        ]}>
            {/* Número romano em destaque */}
            <Text style={[styles.roman, { color: clr.roman }, sm ? styles.romanSm : styles.romanMd]}>
                {badge.levelRoman}
            </Text>
            <Text style={[styles.dot, { color: clr.text }]}>·</Text>
            <Text style={[styles.name, { color: clr.text }, sm ? styles.nameSm : styles.nameMd]}>
                {badge.levelName}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    chip: {
        flexDirection: 'row', alignItems: 'center', gap: 3,
        borderWidth: 1, borderRadius: 20, alignSelf: 'flex-start',
    },
    chipSm: { paddingHorizontal: 6, paddingVertical: 2 },
    chipMd: { paddingHorizontal: 10, paddingVertical: 4 },
    roman: { fontWeight: '900', letterSpacing: 0.2 },
    romanSm: { fontSize: 10 },
    romanMd: { fontSize: 12 },
    dot: { fontSize: 9, opacity: 0.6 },
    name: { fontWeight: '600', letterSpacing: 0.1 },
    nameSm: { fontSize: 9 },
    nameMd: { fontSize: 11 },
});
