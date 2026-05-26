import { StyleSheet } from 'react-native';

export const profileStyles = StyleSheet.create({
    // ── HERO ───────────────────────────────────────────────
    heroSection: { alignItems: 'center', paddingTop: 24, paddingBottom: 20, paddingHorizontal: 20 },
    avatarWrapper: { position: 'relative', marginBottom: 12 },
    avatar: { width: 90, height: 90, borderRadius: 45, borderWidth: 3, borderColor: '#5e17eb' },
    cameraIcon: {
        position: 'absolute', bottom: 0, right: 0,
        backgroundColor: '#5e17eb', borderRadius: 12, padding: 5,
        borderWidth: 2, borderColor: '#F6F1F8',
    },
    name: { fontSize: 20, fontWeight: '800', color: '#1A1A2E', letterSpacing: -0.3 },
    email: { fontSize: 13, color: '#9B8FBB', marginTop: 2 },
    bio: { fontSize: 13, color: '#555', textAlign: 'center', marginTop: 6, lineHeight: 18 },
    xpBadge: {
        flexDirection: 'row', alignItems: 'center', gap: 5,
        backgroundColor: '#5e17eb', borderRadius: 20, paddingHorizontal: 14,
        paddingVertical: 6, marginTop: 10,
    },
    xpBadgeText: { color: '#fff', fontWeight: '700', fontSize: 13 },

    // ── STATS ──────────────────────────────────────────────
    statsRow: {
        flexDirection: 'row', marginHorizontal: 20,
        backgroundColor: '#fff', borderRadius: 18, overflow: 'hidden',
        shadowColor: '#5e17eb', shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.07, shadowRadius: 8, elevation: 2,
    },
    statBox: { flex: 1, alignItems: 'center', paddingVertical: 16 },
    statBorder: { borderLeftWidth: 1, borderRightWidth: 1, borderColor: '#F0E8FB' },
    statNum: { fontSize: 18, fontWeight: '900', color: '#1A1A2E' },
    statLabel: { fontSize: 10, color: '#9B8FBB', fontWeight: '600', marginTop: 2 },

    // ── BADGES ─────────────────────────────────────────────
    sectionTitle: { fontSize: 17, fontWeight: '800', color: '#1A1A2E', marginBottom: 12, letterSpacing: -0.3 },
    emptyBadges: { alignItems: 'center', paddingVertical: 24, gap: 10 },
    emptyText: { fontSize: 14, color: '#9B8FBB', textAlign: 'center' },
    exploreBtn: {
        backgroundColor: '#5e17eb', borderRadius: 22,
        paddingHorizontal: 22, paddingVertical: 10, marginTop: 4,
    },
    exploreBtnText: { color: '#fff', fontWeight: '700', fontSize: 14 },

    badgeCard: {
        flexDirection: 'row', alignItems: 'center', gap: 12,
        backgroundColor: '#fff', borderRadius: 16, padding: 14,
        marginBottom: 10, shadowColor: '#5e17eb',
        shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06,
        shadowRadius: 6, elevation: 2,
    },
    badgeIconWrap: {
        width: 46, height: 46, borderRadius: 14,
        justifyContent: 'center', alignItems: 'center',
        borderWidth: 1.5,
    },
    badgeInfo: { flex: 1, gap: 4 },
    badgeName: { fontSize: 14, fontWeight: '700', color: '#1A1A2E' },
    badgeProgressRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    badgeTrack: { flex: 1, height: 6, borderRadius: 3, overflow: 'hidden' },
    badgeFill: { height: '100%', borderRadius: 3 },
    badgeXp: { fontSize: 11, fontWeight: '700', minWidth: 52, textAlign: 'right' },
    streakText: { fontSize: 11, color: '#ED8936', fontWeight: '600' },

    // ── AÇÕES ─────────────────────────────────────────────
    actionRow: {
        flexDirection: 'row', alignItems: 'center', gap: 12,
        backgroundColor: '#fff', borderRadius: 14, padding: 16,
        borderWidth: 1, borderColor: '#F0E8FB',
        zIndex: 99999,
        elevation: 99999,
    },
    actionLabel: { flex: 1, fontSize: 14, fontWeight: '600', color: '#1A1A2E' },
});
